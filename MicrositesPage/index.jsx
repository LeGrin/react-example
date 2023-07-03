import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cls from 'classnames';
import { Typography } from '@components/Typography';
import Button from '@components/Button';
import { ModalConfirm } from '@components/Modal';
import LockedButton from '@components/LockedButton';
import { micrositesStrings as translation } from '@translations/microsites';
import { BILLING_TYPE_MAP } from '@constants';
import { alertActions, micrositesActions } from '@actions';
import { micrositesService } from '@services';
import { VIEW_TYPE } from '@constants/microsites.constants';
import MicrositeCard from './MicrositeCard';
import EditModal from './EditModal';
import { MicrositesIcon } from 'assets/images/icons';
import { useStyles } from './styles';

const MicrositesPage = () => {
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedMicrosite, setSelectedMicrosite] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modal, setModal] = useState({ open: false, type: VIEW_TYPE.EDIT });
    const [restrictedNames, setRestrictedNames] = useState([]);

    const language = useSelector(state => state.authentication.user?.language || 'GB');
    const user = useSelector(state => state.authentication.user);
    const account = useSelector(state => state.account?.account);
    const data = useSelector(state => state.microsites.data);
    const isAdmin = useSelector(state => {
        if (!state.authentication?.user?.id) return false;
        return state.authentication?.user?.roles?.filter(u => u.role === 0)?.length > 0;
    });
    const classes = useStyles();
    const dispatch = useDispatch();

    translation.setLanguage(language);

    useEffect(() => {
        async function fetchData() {
            const restrictedNames = await micrositesService.getRestrictedNames();
            setRestrictedNames(restrictedNames);
        }
        dispatch(micrositesActions.getAll());
        fetchData();
    }, []);

    const onCreateEmptyMicrosite = async () => {
        setIsSubmitting(true);
        try {
            const newMicrosite = await micrositesService.createEmptyMicrosite();
            await dispatch(micrositesActions.getAll());
            setSelectedMicrosite({ ...newMicrosite, restrictedNames });
            const rn = await micrositesService.getRestrictedNames();
            setRestrictedNames(rn);
            setModal({ open: true, type: VIEW_TYPE.EDIT });
        } catch (error) {
            dispatch(alertActions.error(translation.createMicrositeFail));
        }
        setIsSubmitting(false);
    };

    const onDelete = async () => {
        setIsSubmitting(true);
        try {
            await micrositesService.deleteMicrosite(selectedMicrosite.id);
            await dispatch(micrositesActions.getAll());
            const rn = await micrositesService.getRestrictedNames();
            setRestrictedNames(rn);
            dispatch(alertActions.success(translation.deleteMicrositeSuccess));
        } catch (error) {
            dispatch(alertActions.error(translation.deleteMicrositeFail));
        }
        setSelectedMicrosite(null);
        if (modal.open) {
            setModal({ open: false, type: VIEW_TYPE.EDIT });
        }
        setDeleteModalOpen(false);
        setIsSubmitting(false);
    };

    const onCloseModal = () => {
        setModal({ open: false, type: VIEW_TYPE.EDIT });
        setSelectedMicrosite(null);
    };

    const onSave = async values => {
        setIsSubmitting(true);
        try {
            await micrositesService.updateMicrosite({ ...selectedMicrosite, ...values });
            await dispatch(micrositesActions.getAll());
            const rn = await micrositesService.getRestrictedNames();
            setRestrictedNames(rn);
            dispatch(alertActions.success(translation.editMicrositeSuccess));
        } catch (error) {
            dispatch(alertActions.error(translation.editMicrositeFail));
        }
        setSelectedMicrosite(null);
        if (modal.open) {
            setModal({ open: false, type: VIEW_TYPE.EDIT });
        }
        setIsSubmitting(false);
    };

    const isUser = !isAdmin && !user?.isAccountOwner && !user?.isGlobalAdmin;

    const maxMicrositesNumber = account?.micrositesMaxCount || 0;
    const isEnterprisePlan = account?.billingPlan?.id === BILLING_TYPE_MAP.ENTERPRISE;

    return (
        <div className={classes.container}>
            <div className={classes.headerWrapper}>
                <MicrositesIcon />
                <div className={classes.headerTextWrapper}>
                    <Typography variant="h6" color="textPrimary" className={classes.title}>
                        {translation.createCustomLending}
                    </Typography>
                    <Typography variant="body2" className={classes.subtitle}>
                            {translation.createCustomLendingSubTitle}
                    </Typography>
                    <div className={classes.micrositesCount}>
                        {!isUser && data?.totalCount < maxMicrositesNumber && (
                            <Button
                                className={classes.button}
                                variant="contained"
                                onClick={onCreateEmptyMicrosite}
                                disabled={isSubmitting}
                            >
                                {translation.createNewMicrosite}
                            </Button>
                        )}
                        {!isUser && data?.totalCount >= maxMicrositesNumber && (
                            <LockedButton
                                tooltipType={1}
                                className={classes.button}
                                variant="contained"
                            >
                                {translation.createNewMicrosite}
                            </LockedButton>
                        )}
                        <Typography variant="body1" className={classes.textLight}>
                            {translation.created}
                            {isEnterprisePlan ? (
                                <span className={classes.textDark}>{data?.totalCount}</span>
                            ) : (
                                <span className={cls({ [classes.textDark]: true,[classes.textDanger]: data?.totalCount > maxMicrositesNumber})}>
                                    {translation.formatString(translation.outOf, data?.totalCount, maxMicrositesNumber)}
                                </span>
                            )}
                        </Typography>
                    </div>
                </div>
            </div>
            <div className={classes.cardsWrapper}>
                {data?.microsites.map(item => (
                    <MicrositeCard
                        key={item.id}
                        translation={translation}
                        microsite={item}
                        isUser={isUser}
                        companies={account?.companies}
                        isSubmitting={isSubmitting}
                        onClickEdit={() => {
                            setSelectedMicrosite({...item, restrictedNames: restrictedNames.filter(n => n !== item.slug)});
                            setModal({ open: true, type: VIEW_TYPE.EDIT });
                        }}
                        onClickView={() => {
                            setSelectedMicrosite(item);
                            setModal({ open: true, type: VIEW_TYPE.VIEW });
                        }}
                        onClickDelete={() => {
                            setSelectedMicrosite(item);
                            setDeleteModalOpen(true);
                        }}
                    />
                ))}
            </div>
            {modal.open ? (
                <EditModal
                    language={language}
                    t={translation}
                    modal={modal}
                    account={account}
                    onCloseModal={onCloseModal}
                    selectedMicrosite={selectedMicrosite}
                    onDelete={() => setDeleteModalOpen(true)}
                    onSave={onSave}
                    isSubmitting={isSubmitting}
                    isUser={isUser}
                />
            ) : null}
            {isDeleteModalOpen && (
                <ModalConfirm
                    isOpen={isDeleteModalOpen}
                    handleClose={() => setDeleteModalOpen(false)}
                    title={translation.deleteMicrosite}
                    description={translation.formatString(
                        translation.deleteMicrositeDescription,
                        `"${selectedMicrosite?.name}"`
                    )}
                    onPrimaryAction={onDelete}
                    primaryActionText={translation.deleteSite}
                    primaryActionType="danger"
                />
            )}
        </div>
    );
};

export default MicrositesPage;
