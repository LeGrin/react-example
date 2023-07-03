import { useState, useEffect, useMemo } from 'react';
import cls from 'classnames';
import cloneDeep from 'lodash.clonedeep';
import { makeStyles } from '@material-ui/core/styles';
import { useFormContext } from "react-hook-form";
import { ModalBase } from '@components/Modal';
import IconButton from '@mui/material/IconButton';
import { DeleteIcon } from 'assets/images/icons';
import { Input } from '@components/fields/Input';
import { Select } from '@components/fields/Select';
import Button from '@components/Button';
import { Typography } from '@components/Typography';
import { FIELD_REQUIRED } from '@constants/errorText.constants';

export const useStyles = makeStyles(() => ({
    mb16: {
        marginBottom: '16px !important',
    },
    paper: {
        outline: 'none',
        width: '100%',
        height: 420,
        maxWidth: 652,
        '@media (max-width: 600px)': {
            height: 'var(--100vh)',
            width: '100%',
            maxWidth: 'none',
        }
    },
    modalContent: {
        padding: 16,
        overflow: 'auto',
        maxHeight: 'calc(100% - 118px)'
    },
    overline: {
        fontWeight: '500 !important',
        fontSize: '10px !important',
        lineHeight: '12px !important',
        letterSpacing: '1.5px !important',
        textTransform: 'uppercase !important',
        color: 'rgba(0, 0, 0, 0.6) !important',
        display: 'block !important',
    },
    additionalLanguagesControl: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    defaultLanguageWrapper: {
        display: 'grid',
        gridGap: 8,
        gridTemplateColumns: '160px 160px 1fr',
        '@media (max-width: 768px)': {
            gridTemplateColumns: '100%',
        }
    },
    defaultSurveyLanguageWrapper: {
        gridTemplateColumns: '160px 1fr',
        '@media (max-width: 768px)': {
            gridTemplateColumns: '160px 1fr',
        },
        '@media (max-width: 600px)': {
            gridTemplateColumns: '100%',
            gridGap: 0,
        }
    },
    additionalLanguageWrapper: {
        display: 'grid',
        gridGap: 8,
        gridTemplateAreas: '"select input1 input2 button"',
        gridTemplateColumns: '160px 160px 1fr 40px',
        '@media (max-width: 768px)': {
            gridTemplateAreas: '"select button" "input1 input1" "input2 input2"',
            gridTemplateColumns: '1fr 40px',
            gridColumnGap: 8,
            gridRowGap: 10,
        }
    },
    additionalSurveyLanguageWrapper: {
        gridTemplateAreas: '"select input1 button"',
        gridTemplateColumns: '160px 1fr 40px',
        '@media (max-width: 768px)': {
            gridTemplateColumns: '160px 1fr 40px',
        },
        '@media (max-width: 600px)': {
            gridTemplateAreas: '"select button" "input1 input1"',
            gridTemplateColumns: '1fr 40px',
        }
    },
    select: {
        gridArea: 'select'
    },
    input1: {
        gridArea: 'input1'
    },
    input2: {
        gridArea: 'input2'
    },
    button: {
        gridArea: 'button'
    },
    iconBtn: {
        border: '1px solid rgba(0, 0, 0, 0.12) !important',
        borderRadius: '4px !important',
        height: '40px !important',
        width: '40px !important',
        padding: '2px !important',
        '&:not(:last-child)': {
            marginRight: 8
        },
        '& svg': {
            width: '18px',
            height: '18px',
            '& path': {
                fill: 'rgba(0, 0, 0, 0.6)'
            }
        }
    },
}));

const UA_OPTIONS = [
    { label: 'Українська', value: 'UA' },
    { label: 'English', value: 'GB' }
];
const GB_OPTIONS = [
    { label: 'English', value: 'GB' },
    { label: 'Español', value: 'ES' },
    { label: 'Français', value: 'FR' },
    { label: 'Deutsch', value: 'DE' },
];
const INTERNATIONAL_OPTIONS = [
    { label: 'English', value: 'GB' },
    { label: 'Español', value: 'ES' },
    { label: 'Français', value: 'FR' },
    { label: 'Deutsch', value: 'DE' },
    { label: 'Português', value: 'PT' },
    { label: 'العربية', value: 'AR' },
    { label: 'Русский', value: 'RU' },
    { label: 'Українська', value: 'UA' },
];
const ES_OPTIONS = [
    { label: 'Español', value: 'ES' },
    { label: 'English', value: 'GB' },
    { label: 'Français', value: 'FR' },
    { label: 'Deutsch', value: 'DE' },
    { label: 'Português', value: 'PT' },
    { label: 'Русский', value: 'RU' },
    { label: 'Українська', value: 'UA' },
];
const PT_OPTIONS = [
    { label: 'Português', value: 'PT' },
    { label: 'Español', value: 'ES' },
    { label: 'English', value: 'GB' },
    { label: 'Français', value: 'FR' },
    { label: 'Deutsch', value: 'DE' },
    { label: 'Русский', value: 'RU' },
    { label: 'Українська', value: 'UA' },
];

const I18N_MAP = {
    0: GB_OPTIONS,
    1: UA_OPTIONS,
    2: INTERNATIONAL_OPTIONS,
    3: ES_OPTIONS,
    4: PT_OPTIONS,
    5: PT_OPTIONS,
};

const LocalizeModal = ({ t, modal, onClose, preview, setPreview, locale, language, currentLocale }) => {
    const [links, setLinks] = useState({});
    const classes = useStyles();
    const { setValue } = useFormContext();
    FIELD_REQUIRED.setLanguage(language);

    useEffect(() => {
        if (!modal.ctx) return;
        setLinks(preview.links);
    }, [modal, preview]);

    const languageOptions = I18N_MAP[locale];
    const restLanguageOptions = I18N_MAP[locale].filter(lO => lO.value !== currentLocale);

    const onChangeDefaultLink = (e, key) => {
        const linksCopy = cloneDeep(links);
        localLinks[key] = { ...localLinks[key], [e.target.name]: e.target.value };
        linksCopy[modal.ctx] = localLinks;
        setLinks(linksCopy);
    };

    const onChangeAdditionalLink = (e, key) => {
        const linksCopy = cloneDeep(links);
        localLinks[key] = { ...localLinks[key], [e.target.name]: e.target.value };
        linksCopy[modal.ctx] = localLinks;
        setLinks(linksCopy);
    };
    const onAddLanguage = () => {
        const linksCopy = cloneDeep(links);
        if (modal.isSurvey) {
            localLinks.push({
                surveyId: links[modal.ctx]?.[0]?.surveyId,
                link: '',
                language: restLanguageOptions[0].value
            });
        } else {
            localLinks.push({ title: 'Default title', link: '', language: restLanguageOptions[0].value });
        }
        linksCopy[modal.ctx] = localLinks;
        setLinks(linksCopy);
    };

    const onDeleteAdditional = index => {
        const linksCopy = cloneDeep(links);
        localLinks.splice(index, 1);
        linksCopy[modal.ctx] = localLinks;
        setLinks(linksCopy);
    };

    const onSave = () => {
        setPreview({ ...preview, links: links });
        setValue('links', links);
        setLinks({});
        onClose();
    };

    const isValid = useMemo(() => 
        Object.values(links).flat().every(link => !!link.title && (!!link.link || !!link.surveyId)),
    [links]);

    if (!links[modal.ctx]) return null;

    const firstLink = links[modal.ctx].find(l => l.language === currentLocale) || links[modal.ctx][0];
    const localLinks = [firstLink, ...links[modal.ctx].filter(l => l.language !== currentLocale)];

    return (
        <ModalBase
            isOpen={modal.open}
            handleClose={onClose}
            classNames={{ paper: classes.paper, content: classes.modalContent }}
            title={t.formatString(t.modalLocalizeTitle, firstLink?.title || '')}
            onPrimaryAction={onSave}
            primaryActionDisabled={!isValid}
            primaryActionText={t.save}
            onSecondaryAction={onClose}
            secondaryActionText={t.cancel}
        >
            <div className={classes.content}>
                <Typography variant="caption" className={cls(classes.overline, classes.mb16)}>
                    {t.defaultLanguages}
                </Typography>
                <div
                    className={cls({
                        [classes.defaultLanguageWrapper]: true,
                        [classes.defaultSurveyLanguageWrapper]: modal.isSurvey
                        })}
                    >
                    <Select
                        value={firstLink?.language}
                        name="language"
                        onChange={e => onChangeDefaultLink(e, 0)}
                        label={t.language}
                        disabled
                        fullWidth
                        options={languageOptions}
                    />
                    <Input
                        inputProps={{
                            name: 'title',
                            value: firstLink?.title,
                            onChange: e => onChangeDefaultLink(e, 0)
                        }}
                        error={!firstLink?.title}
                        helperText={!firstLink?.title ? FIELD_REQUIRED.message : ""}
                        required
                        label={t.linkTitle}
                        fullWidth
                    />
                    {!modal.isSurvey ? (
                        <Input
                            inputProps={{
                                name: 'link',
                                value: firstLink?.link,
                                onChange: e => onChangeDefaultLink(e, 0)
                            }}
                            label={t.linkUrl}
                            required
                            error={!firstLink?.link}
                            helperText={!firstLink?.link ? FIELD_REQUIRED.message : ""}
                            fullWidth
                        />
                    ) : null}
                </div>
                <div className={classes.additionalLanguagesControl}>
                    <Typography variant="caption" className={classes.overline}>{t.additionalLanguages}</Typography>
                    <Button variant="outlined" onClick={onAddLanguage}>
                        {t.addLanguage}
                    </Button>
                </div>
                {localLinks.filter(l => l.language != firstLink.language).map((link, index) => {       
                    return (
                    <div
                        className={cls({
                            [classes.additionalLanguageWrapper]: true,
                            [classes.additionalSurveyLanguageWrapper]: modal.isSurvey
                        })}
                        key={index}>
                        <Select
                            value={link?.language}
                            name="language"
                            onChange={e => onChangeAdditionalLink(e, index + 1)}
                            label={t.language}
                            fullWidth
                            options={restLanguageOptions}
                            className={classes.select}
                        />
                        <Input
                            inputProps={{
                                name: 'title',
                                value: link?.title,
                                onChange: e => onChangeAdditionalLink(e, index + 1)
                            }}
                            required
                            error={!link?.title}
                            helperText={!link?.title ? FIELD_REQUIRED.message : ""}
                            className={classes.input1}
                            label={t.linkTitle}
                            fullWidth
                        />
                        {!modal.isSurvey ? (
                            <Input
                                inputProps={{
                                    name: 'link',
                                    value: link?.link,
                                    onChange: e => onChangeAdditionalLink(e, index + 1)
                                }}
                                required
                                error={!link?.link}
                                helperText={!link?.link ? FIELD_REQUIRED.message : ""}
                                className={classes.input2}
                                label={t.linkUrl}
                                fullWidth
                            />
                        ) : null}

                        <IconButton className={cls(classes.iconBtn, classes.button)} onClick={() => onDeleteAdditional(index + 1)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                )})}
            </div>
        </ModalBase>
    );
};

export default LocalizeModal;
