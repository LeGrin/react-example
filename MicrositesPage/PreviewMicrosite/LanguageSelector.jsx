import { makeStyles } from '@material-ui/core/styles';
import ArrowDownIcon from 'assets/images/select-arrow-down.svg';

const useStyles = makeStyles(() => ({
    i18nWrapper: {
        paddingRight: 10,
        alignSelf: 'flex-end',
        display: 'flex',
        marginBottom: 25,
        position: 'relative',
        '&::before': {
            content: '""',
            width: 5,
            height: 3,
            display: 'block',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: 0,
            backgroundImage: `url(${ArrowDownIcon})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '5px 3px',
            zIndex: 2,
        },
    },
    i18nSelect: {
        width: '100%',
        outline: 'none',
        border: 'none',
        background: 'inherit',
        appearance: 'none',
        '-mox-appearance': 'none',
        '-webkit-appearance': 'none',
        fontFamily: 'Rubik',
        fontWeight: 400,
        fontSize: '10px',
        lineHeight: '14px',
        letterSpacing: '0.4px',
        color: 'rgba(0, 0, 0, 0.6)',
        zIndex: 3,
        '&:disabled': {
            opacity: 1
        }
    },
}));

const I18N_MAP = {
    GB: '🇬🇧 English',
    ES: '🇪🇸 Español',
    DE: '🇩🇪 Deutsch',
    FR: '🇫🇷 Français',
    AR: 'العربية 🇾🇪',
    UA: '🇺🇦 Українська',
    PT: '🇵🇹 Português',
};

const LanguageSelector = ({ selectedLanguage = 'GB' }) => {
    const classes = useStyles();

    return (
        <div className={classes.i18nWrapper}>
            <select className={classes.i18nSelect} value="GB" disabled>
                <option value="GB">{I18N_MAP[selectedLanguage]}</option>
            </select>
        </div>
    );
};

export default LanguageSelector;
