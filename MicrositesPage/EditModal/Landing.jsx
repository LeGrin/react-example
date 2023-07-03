import { useState } from 'react';
import cls from 'classnames';
import { Controller, useFormContext } from "react-hook-form";
import cloneDeep from 'lodash.clonedeep';
import { Input } from '@components/fields/Input';
import MenuItem from '@mui/material/MenuItem';
import Button from '@components/Button';
import { Switch } from '@components/fields/Switch';
import { Typography } from '@components/Typography';
import { micrositesService } from '@services';
import LocalizeModal from './LocalizeModal';
import { useStyles, CssMenu } from './styles';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MoveIcon } from 'assets/images/icons';
import { Select } from '@components/fields/Select';
import { FIELD_REQUIRED } from '@constants/errorText.constants';

const LANGUAGES_MAP = {
    0: ['GB', 'DE', 'ES', 'FR', 'AR'],
    1: ['UA', 'GB'],
    2: ['GB', 'DE', 'ES', 'FR', 'AR'],
    3: ['ES', 'DE', 'GB', 'FR', 'AR'],
    4: ['PT', 'ES', 'DE', 'GB', 'FR', 'AR'],
    5: ['PT', 'ES', 'DE', 'GB', 'FR', 'AR'],
};
const LOCALES = { 0: 'GB', 1: 'UA', 2: 'GB', 3: 'ES', 4: 'PT', 5: 'PT' };

const Landing = ({
    t,
    isView,
    preview,
    setPreview,
    surveyOptions,
    account,
    language
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const [localizeModal, setLocalizeModal] = useState({ open: false, ctx: null });
    const classes = useStyles();
    const [openLinks, setOpenLinks] = useState([]);
    const { control, setValue, getValues } = useFormContext();
    const [anchorEl, setAnchorEl] = useState(null);

    const availableLanguages = LANGUAGES_MAP[account?.locale];
    const currentLocale = LOCALES[account?.locale];
    FIELD_REQUIRED.setLanguage(language);

    const linkClick =(key) => {
        if (openLinks.includes(key)) {
            setOpenLinks(openLinks.filter(k => k !== key));
        } else {
            setOpenLinks([...openLinks, key]);
        }
    }
    const onClickAddLink = () => {
        handleClose();
        const linksCopy = cloneDeep(preview.links);
        const newLinks = {
            ...linksCopy,
            [Object.keys(preview.links).length]: [{ title: 'Default title', link: '', language: availableLanguages[0] }]
        };
        setPreview({ ...preview, links: newLinks });
        setValue('links', newLinks);
    };

    const onClickAddSurvey = () => {
        handleClose();
        const linksCopy = cloneDeep(preview.links);
        const newLinks = {
            ...linksCopy,
            [Object.keys(preview.links).length]: [{
                title: 'Default title',
                link:'',
                language: availableLanguages[0],
                surveyId: surveyOptions[0].value
            }]
        };
        setPreview({ ...preview, links: newLinks });
        setValue('links', newLinks);
    };

    const onChangeDefaultLink = (e, key, lang) => {
        const linksCopy = cloneDeep(preview.links);
        // find index of the link to change
        const linkIndex = linksCopy[key].findIndex(l => l.language === lang);
        // update it with necessary field
        linksCopy[key][linkIndex] = { ...linksCopy[key][linkIndex], [e.target.name]: e.target.value };
        setPreview({ ...preview, links: linksCopy });
        setValue('links', linksCopy);
    };

    const onChangeSurvey = (e, key) => {
        const linksCopy = cloneDeep(preview.links);
        linksCopy[key].forEach((item) => {
            item.surveyId = e.target.value;
            item.link = '';
        });
        setPreview({ ...preview, links: linksCopy });
        setValue('links', linksCopy);
    }

    const onClickDelete = key => {
        const linksCopy = cloneDeep(preview.links);
        delete linksCopy[key];
        const linksCopyWithUpdatedIndexes = Object.values(linksCopy).reduce((prev, cur, index) => {
            return { ...prev, [index]: cur };
        }, {});
        setPreview({ ...preview, links: linksCopyWithUpdatedIndexes });
        setValue('links', linksCopyWithUpdatedIndexes);
    };

    const uploadLogo = async e => {
        try {
            setIsUploading(true);
            const data = new FormData()
            data.append('file', e.target.files[0])
            data.append('fileName', e.target.files[0].name);
            const response = await micrositesService.uploadMicrositeImage(data, preview.id);
            setPreview({ ...preview, logoUrl: response.publicUrl });
            setValue('logoUrl', response.publicUrl);
        } catch (_) {
        }
        setIsUploading(false);
    };

    const handleClick = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <>  
            <>
                <Typography variant="body2">{t.logo}</Typography>
                <Typography variant="caption" className={classes.logoSubtitle}>{t.recommendedDimension}</Typography>
                <div className={classes.uploadWrapper}>
                    {preview.logoUrl &&
                        <div className={classes.logoName}>
                            <img className={classes.uploadImg} src={preview.logoUrl} alt="logo" />
                        </div>
                    }
                    <Button variant="outlined" aria-label="upload picture" component="label" disabled={isUploading || isView}>
                        <input hidden accept="image/png, image/jpg, image/jpeg" type="file" onChange={uploadLogo} />
                        {preview.logoUrl ? t.replace : t.upload}
                    </Button>
                </div>
                <Typography variant="body2" className={classes.additionalContent}>{t.additionalContent}</Typography>
                <Controller
                    control={control}
                    name="socialMediaEnable"
                    render={({ field, ref }) =>
                        <Switch
                            {...field}
                            ref={ref}
                            className={classes.switchInput}
                            checked={getValues('socialMediaEnable')}
                            handleChange={event => {
                                setValue('socialMediaEnable', event.target.checked);
                                setPreview({ ...preview, socialMediaEnable: event.target.checked });
                            }}
                            label={t.displaySocialMediaLinks}
                            disabled={isView}
                        />
                    }
                />
                <Controller
                    control={control}
                    name="showReviews"
                    render={({ field, ref }) =>
                        <Switch
                            {...field}
                            ref={ref}
                            className={classes.switchInput}
                            checked={getValues('showReviews')}
                            handleChange={event => {
                                setValue('showReviews', event.target.checked);
                                setPreview({ ...preview, showReviews: event.target.checked });
                            }}
                            label={t.showReviews}
                            disabled={isView}
                        />
                    }
                />
            </>
            <div className={classes.linksWrapper}>
                <div className={classes.oneColForm}>
                    <Typography variant="body2">{t.links}</Typography>
                    <Typography variant="caption" className={classes.logoSubtitle}>{t.linksSubtitle}</Typography>
                </div>
                    <div >
                        <Button id="pl-menu-add-link" variant="outlined" onClick={handleClick} disabled={isView} startIcon={!!anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}>{t.addLink}</Button>
                        <CssMenu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={!!anchorEl}
                            onClose={handleClose}
                            PaperProps={{ id: 'pl-menu-add-link-list' }}
                            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                        >
                            <MenuItem onClick={onClickAddLink}>
                                <Typography variant="body2">{t.link}</Typography>
                            </MenuItem>
                            <MenuItem onClick={onClickAddSurvey}>
                                <Typography variant="body2">{t.survey}</Typography>
                            </MenuItem>
                        </CssMenu>
                    </div>
            </div>
            <div className={classes.customLinksWrapper}>
                {Object.entries(preview.links).map(([key, links], index) => {
                    const link = links.find(l => l.language === currentLocale) || links[0];
                    const isSurvey = link.surveyId !== undefined && link.surveyId !== null;
                    const isOpen = openLinks.includes(key);
                    
                    return (
                        <div className={cls({ [classes.customLink]: true, [classes.customLinkExpanded]: isOpen })} key={index}>
                            <div className={classes.customLinkHeader} onClick={() => linkClick(key)}>
                                <div className={classes.customLinkHeaderTitleBox}>
                                    <MoveIcon className={classes.menuIcon} />
                                    <div className={classes.customLinkHeaderTitle}>
                                        <Typography variant="caption" className={classes.logoSubtitle}>
                                            {isSurvey ? t.survey : t.link}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: '500 !important' }}>
                                            {link?.title}
                                        </Typography>
                                    </div>
                                </div>
                                {isOpen ? <ExpandLessIcon className="sidebar-menu-arrow" /> : <ExpandMoreIcon className="sidebar-menu-arrow" />}
                            </div>
                            {isOpen ? (
                                <>
                                    <div className={cls(classes.twoColForm, classes.customLinkInputsWrapper)}>
                                        <Input
                                            inputProps={{
                                                name: 'title',
                                                value: link?.title,
                                                onChange: e => onChangeDefaultLink(e, key, link?.language)
                                            }}
                                            label={t.linkTitle}
                                            error={!link?.title}
                                            helperText={!link?.title ? FIELD_REQUIRED.message : ""}
                                            fullWidth
                                            required
                                            disabled={isView}
                                        />
                                        {isSurvey ? (
                                            <Select
                                                onChange={e => onChangeSurvey(e, key)}
                                                label={t.survey}
                                                fullWidth
                                                value={link.surveyId}
                                                options={surveyOptions}
                                                disabled={isView}
                                            />
                                        ) : (
                                            <Input
                                                inputProps={{
                                                    name: 'link',
                                                    value: link?.link,
                                                    onChange: e => onChangeDefaultLink(e, key, link?.language)
                                                }}
                                                label={t.linkUrl}
                                                error={!link?.link}
                                                helperText={!link?.link ? FIELD_REQUIRED.message : ""}
                                                fullWidth
                                                disabled={isView}
                                            />
                                        )}
                                    </div>
                                    <div className={classes.customLinkControlsWrapper}>
                                        <Button
                                            variant="outlined"
                                            onClick={() => setLocalizeModal({ open: true, ctx: key, isSurvey: isSurvey })}
                                            disabled={isView}
                                        >
                                            {t.localization}
                                        </Button>
                                        <div>
                                            <Button
                                                variant="danger"
                                                size="large"
                                                onClick={() => onClickDelete(key)}
                                                disabled={isView}
                                            >
                                                {t.delete}
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    );
                })}
            </div>
            {Object.keys(preview.links).length > 0 && (
                <LocalizeModal
                    t={t}
                    modal={localizeModal}
                    onClose={() => setLocalizeModal({ open: false, ctx: null })}
                    preview={preview}
                    setPreview={setPreview}
                    locale={account?.locale}
                    surveyOptions={surveyOptions}
                    language={language}
                    currentLocale={currentLocale}
                />
            )}
        </>
    );
};

export default Landing;
