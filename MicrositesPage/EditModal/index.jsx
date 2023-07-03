import { useState, useMemo, useEffect, useRef } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import * as yup from 'yup';
import { RadioButtonsGroup } from '@components/fields/RadioButtonsGroup';
import { ModalBase } from '@components/Modal';
import { useYupValidationResolver } from '@hooks/useYupValidationResolver';
import { FIELD_REQUIRED, TAKEN_URL, MIN_LENGTH_8 } from '@constants/errorText.constants';
import { VIEW_TYPE } from '@constants/microsites.constants';
import PreviewMicrosite from '../PreviewMicrosite';
import General from './General';
import Landing from './Landing';
import { useStyles } from './styles';

const Tab = {
    'Settings': 0,
    'Content': 1
};

const EditModal = ({
    language,
    t,
    modal,
    onCloseModal,
    selectedMicrosite,
    onDelete,
    onSave,
    account,
    isSubmitting,
    isUser,
}) => {
    const [tab, setTab] = useState(Tab.Settings);

    const [location, setLocation] = useState(null);

    // landing landingPreview
    const [previewLanding, setPreviewLanding] = useState({
        socialMediaEnable: false,
        logoUrl: '',
        showReviews: false,
        links: {},
        companyId: null,
        id: null
    });

    const initRef = useRef(0);

    const classes = useStyles();
    FIELD_REQUIRED.setLanguage(language);
    TAKEN_URL.setLanguage(language);
    MIN_LENGTH_8.setLanguage(language);

    const MicrositesSchema = yup.object().shape({
        name: yup.string().required(FIELD_REQUIRED.message),
        slug: yup.string()
            .required(FIELD_REQUIRED.message)
            .not(selectedMicrosite?.restrictedNames || [], TAKEN_URL.message)
            .matches(/^(?!service-review+\b)/i, TAKEN_URL.message)
            .min(8, MIN_LENGTH_8.message),
    });

    const resolver = useYupValidationResolver(MicrositesSchema);

    const { getValues, setValue, control, formState: { isValid } } = useForm({
        mode: 'all',
        resolver,
        defaultValues: {
            name: '',
            companyId: '',
            slug: '',
            socialMediaEnable: false,
            logoUrl: '',
            links: {},
            showReviews: false,
            updateGoogleWebsite: false
        }
    });

    const allLinksHaveValue = useMemo(() => 
        Object.values(previewLanding.links).flat().every(link => !!link.title && (!!link.link || !!link.surveyId)),
    [previewLanding.links]);

    const companyOptions = useMemo(() => 
        account?.companies?.map(c => ({ label: c.companyName, value: c.companyId })),
    [account]);

    useEffect(() => {
        if (selectedMicrosite && account && !location && modal.open) {
            setLocation(selectedMicrosite.companyId);
        }
    }, [selectedMicrosite, account, location, modal.open]);

    useEffect(() => {
        if (selectedMicrosite && account && modal.open) {
            setValue('name', selectedMicrosite.name, { shouldValidate: true, shouldDirty: true });
            setValue('companyId', selectedMicrosite.companyId, { shouldDirty: true });
            setValue('slug', selectedMicrosite.slug, { shouldValidate: true, shouldDirty: true });
            setValue('updateGoogleWebsite', selectedMicrosite.updateGoogleWebsite, { shouldDirty: true });
            setValue('socialMediaEnable', selectedMicrosite.socialMediaEnable, { shouldDirty: true });
            setValue('logoUrl', selectedMicrosite.logoUrl, { shouldDirty: true });
            setValue('links', selectedMicrosite.links || {}, { shouldDirty: true });
            setValue('showReviews', selectedMicrosite.showReviews, { shouldDirty: true });

            setPreviewLanding({
                socialMediaEnable: selectedMicrosite.socialMediaEnable,
                logoUrl: selectedMicrosite.logoUrl,
                links: selectedMicrosite.links || {},
                showReviews: selectedMicrosite.showReviews,
                slug: selectedMicrosite.slug,
                surveyId: selectedMicrosite.surveyId,
                companyId: selectedMicrosite.companyId,
                id: selectedMicrosite.id
            });
        }
    }, [selectedMicrosite, setValue, account, modal.open]);

    const previewCompany = useMemo(() => account?.companies?.find(c => c.companyId === location) || {}, [location, account]);
    const surveyOptions = useMemo(() => previewCompany.surveys?.map(s => ({ label: s.name, value: s.externalId })), [previewCompany]);

    const isView = modal.type === VIEW_TYPE.VIEW;

    const onClose = () => {
        onCloseModal();
        setTab(Tab.Settings);
        setLocation(null);
        setPreviewLanding({ socialMediaEnable: false, logoUrl: '', links: {}, showReviews: false, companyId: null, id: null });
        initRef.current = 0;
    };
    return (
        <ModalBase
            isOpen={modal.open}
            handleClose={onClose}
            classNames={{ paper: classes.paper, content: classes.modalContent }}
            title={t.modalTitle}
            onPrimaryAction={isUser ? null : () => {
                onSave(getValues());
                onClose();
            }}
            primaryActionText={t.save}
            primaryActionDisabled={isSubmitting || !isValid || !allLinksHaveValue}
            onSecondaryAction={onClose}
            secondaryActionText={t.cancel}
            onAdditionalAction={isUser ? null : onDelete}
            additionalTextButton={t.deleteSite}
        >
            <FormProvider {...{ getValues, setValue, control, isValid }}>
                <div className={classes.content}>
                    <div className={classes.tabsWrapper}>
                        <RadioButtonsGroup
                            value={tab}
                            onChange={setTab}
                            options={[
                                {value: Tab.Settings, label: 'Settings'},
                                {value: Tab.Content, label: 'Content'}
                            ]}
                            className={classes.tabs}
                        />
                    </div>
                    {tab === Tab.Settings && (
                        <General
                            t={t}
                            isView={isView}
                            account={account}
                            setLocation={setLocation}
                            setPreview={setPreviewLanding}
                            preview={previewLanding}
                            companyOptions={companyOptions}
                            restrictedNames={selectedMicrosite?.restrictedNames}
                            location={location}
                        />
                    )}
                    {tab === Tab.Content && (
                        <Landing
                            t={t}
                            isView={isView}
                            preview={previewLanding}
                            surveyOptions={surveyOptions}
                            setPreview={setPreviewLanding}
                            account={account}
                            language={language}
                        />
                    )}
                </div>
                <div className={classes.preview}>
                    <PreviewMicrosite 
                        account={account} 
                        company={previewCompany} 
                        preview={previewLanding} 
                        locale={account?.locale} />
                </div> 
            </FormProvider>
        </ModalBase>
    );
};

export default EditModal;
