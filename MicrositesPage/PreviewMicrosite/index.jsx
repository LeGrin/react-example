import { styled } from '@mui/system';
import Rating from '@mui/material/Rating';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { ExternalLink } from '@components/Link';
import Button from '@components/Button';
import { postReviewPreviewStrings as t } from '@translations/postReviewPreview';
import pluspointGrey from 'assets/images/pluspoint-grey.svg';
import { FacebookIcon, InstagramIcon } from 'assets/images/social-survey';
import LanguageSelector from './LanguageSelector';
import { useStyles } from './styles';
import { IntegrationName } from '@constants/integrations.constants';

const Container = styled('div')(() => `
    font-size: 12px;
    font-family: Rubik;
    background-color: #F2F2F2;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-gap: 20px;
    height: 100%;
    overflow: auto;
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2);
    & p {
        margin: 0;
    }
`);
const Header = styled('div')(() => `
    background-color: #F2F2F2;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px 24px 0;
`);
const Footer = styled('div')(() => `
    background-color: #F2F2F2;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 24px 24px;
`);
const SocialWrapper = styled('div', { shouldForwardProp: prop => prop !== 'hasBothLinks'})(({ hasBothLinks }) => `
    margin-bottom: 24px;
    & svg {
        display: inline;
    }
    & svg:nth-of-type(1) {
        margin-right: ${hasBothLinks ? 32 : 0}px;
    }
`);
const Logo = styled('img')(() => `
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid #1F4C5C;
`);
const PluspointLogo = styled('img')(() => `
    width: 88px;
    height: 10px;
    align-self: center;
    margin-top: auto;
`);
const MenuLink = styled(ExternalLink)(() => `
    text-decoration: none;
    display: inline-block;
    width: 100%;
`);
const MenuButton = styled(Button)(() => ({
    height: '40px !important',
    minHeight: '40px !important',
    width: '100%',
    alignSelf: 'center',
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
    borderRadius: 0,
}));
const ReviewButton = styled(Button)(() => ({
    height: '40px !important',
    minHeight: '40px !important',
    width: '100%',
    alignSelf: 'center',
    border: `2px solid #1F4C5C`,
    fontSize: '12px !important',
    marginBottom: 8,
    textTransform: 'uppercase',
    borderRadius: 0,
    '&:hover': {
        border: `2px solid #1F4C5C`,
    },
}));

const LOCALES = {
    0: 'GB',
    1: 'UA',
    2: 'GB',
    3: 'ES',
    4: 'PT',
    5: 'PT',
};

const PreviewMicrosite = ({ preview, company, account }) => {
    const classes = useStyles();
    const currentLocale = LOCALES[account?.locale];
    t.setLanguage(currentLocale);

    const hasInstagramLink = company?.profiles?.find(p => p.type === IntegrationName.Facebook && p.profileUniqueId);
    const hasFacebookLink = company?.profiles?.find(p => p.type === IntegrationName.Facebook && p.profileUniqueId);
    return (
            <div className={classes.previewContainer}>
                <div style={{ height: 540, width: 280 }}>
                    <Container>
                        <Header>
                            <LanguageSelector selectedLanguage={currentLocale} />
                            <div>
                                {preview.logoUrl && <Logo src={preview.logoUrl} alt="logo" />}
                                <p className={classes.headerMessage}>
                                    <span style={{ display: 'block'}}><b>{company.companyName}</b></span>
                                    {company.address}
                                </p>
                                {preview.showReviews && (
                                    <div className={classes.reviewsWrapper}>
                                        <p className={classes.headerMessage}>4.0</p>
                                        <Rating
                                            value={4}
                                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                            disabled
                                            style={{ alignSelf: 'center' }}
                                        />
                                        <p className={classes.headerMessage}>1256 {t.reviews}</p>
                                    </div>
                                )}
                            </div>
                        </Header>
                        <Footer>
                            <div style={{ marginBottom: 48 }}>
                                {Object.entries(preview.links).map(([key, links]) => {
                                    const link = links.find(l => l.language === currentLocale) || links[0] || {};
                                    const isSurvey = link.surveyId != null && link.surveyId !== undefined;
                                    const itemKey = `${key}_${link.title}_${link.link}`;
                                    return isSurvey ? (
                                        <ReviewButton variant="contained" key={itemKey}>{link?.title}</ReviewButton>
                                    ) 
                                    :
                                    (
                                        <MenuLink variant="caption" underline="always" key={itemKey}>
                                            <MenuButton variant="outlined">{link?.title}</MenuButton>
                                        </MenuLink>
                                    )
                                })}
                            </div>
                            {preview.socialMediaEnable && (
                                <SocialWrapper hasBothLinks={hasInstagramLink && hasFacebookLink}>
                                    {hasFacebookLink && <FacebookIcon />}
                                    {hasInstagramLink && <InstagramIcon />}
                                </SocialWrapper>
                            )}
                            <PluspointLogo src={pluspointGrey} alt="pl-logo" />
                        </Footer>
                    </Container>
                </div>
            </div>
        );
};

export default PreviewMicrosite;
