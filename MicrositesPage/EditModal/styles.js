import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';

export const KeyboardArrowDown = styled(KeyboardArrowDownIcon, {
    shouldForwardProp: prop => prop !== 'opened'
})(({ opened }) => ({
    transform: opened && 'rotate(180deg)',
}));

export const CssMenu = styled(Menu)({
    '.MuiMenu-paper': {
        minWidth: '120px',
        boxShadow: '0px 24px 38px rgba(0, 0, 0, 0.14), 0px 9px 46px rgba(0, 0, 0, 0.12), 0px 11px 15px rgba(0, 0, 0, 0.2)',
        borderRadius: 8,
        transform: 'translateY(12px) translatex(-56px) !important',
    },
    '.MuiMenuItem-root': {
        padding: '8px 13px',
        fontSize: '16px',
        lineHeight: '24px',
        width: '120px',
        justifyContent: 'flex-start'
    },
    '.MuiMenu-list': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    '.MuiMenuItem-logout': {
        color: '#B00020'
    }
});

export const useStyles = makeStyles(() => ({
    mb8: {
        marginBottom: '8px !important',
    },
    paper: {
        outline: 'none',
        width: 'calc(100% - 32px) !important',
        height: 'calc(var(--100vh) - 32px) !important',
        '@media (max-width: 600px)': {
            height: 'var(--100vh) !important',
            width: '100% !important'
        }
    },
    modalContent: {
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        height: 'calc(100% - 118px)',
        '@media (max-width: 768px)': {
            gridTemplateColumns: '100%',
        }
    },
    content: {
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
    },
    preview: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2'
    },
    oneColForm: {
        margin: '8px 0',
    },
    twoColForm: {
        display: 'grid',
        gridTemplateColumns: 'calc(33% - 8px) calc(66% - 8px)',
        gridGap: 16,
        margin: '8px 0',
        '@media (max-width: 768px)': {
            gridTemplateColumns: '100%',
            gridGap: 0,
        }
    },
    subtitle: {
        cursor: 'pointer !important',
        color: 'rgba(0, 0, 0, 0.6) !important',
    },
    advancedSettings: {
        display: 'flex',
        marginTop: '16px !important',
        cursor: 'pointer !important',
        '& svg': {
            marginLeft: 8,
            width: 16
        }
    },
    selectInput: {
        maxWidth: 250,
        '@media (max-width: 600px)': {
            maxWidth: 'none'
        },
        '& .MuiInputBase-adornedEnd': {
            paddingRight: 0
        }
    },
    switchInput: {
        paddingTop: 8,
        width: '100% !important',
    },
    twoColFormShort: {
        paddingTop: 16,
        gridTemplateColumns: 'calc(40% - 8px) calc(60% - 8px)',
        margin: 0,
        '@media (max-width: 1024px)': {
            gridTemplateColumns: '100%',
        }
    },
    additionalContent: {
        paddingTop: '32px !important',

    },
    logoName: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    platforms: {
        paddingTop: 16
    },
    platformsList: {
        paddingTop: 16,
    },
    platformCheck: {
        display: 'flex',
        alignItems: 'center',
        transform: 'translateX(-7px)',
        '& .MuiCheckbox-root': {
            padding: 4
        }
    },
    tabsWrapper: {
        overflowX: 'auto',
        height: 48,
        marginBottom: 24,
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        '-ms-overflow-style': 'none',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    },
    tabs: {
        width: '163px !important',
        display: 'block !important',
        marginBottom: '24px !important',
        '& .MuiFormControlLabel-root': {
            height: '32px !important',
            padding: '0 4px !important',
        }
    },
    // landing
    linksWrapper: {
        margin: '16px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    leaveFeedbackLink: {
        padding: '14px 16px',
        borderRadius: 4,
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)',
    },
    logoSubtitle: {
        color: 'rgba(0, 0, 0, 0.6) !important',
        margin: '4px 0 8px !important'
    },
    uploadWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    uploadImg: {
        display: 'inline-block',
        marginRight: 8,
        padding: 8,
        width: 74,
        height: 74,
        background: 'rgba(0, 0, 0, 0.14)',
        borderRadius: 4
    },
    customLink: {
        padding: '4px 16px',
        height: '54px',
        marginBottom: 8,
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)',
        borderRadius: 4,
        position: 'relative'
    },
    customLinkExpanded: {
        height: '178px !important',
    },
    customLinkHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        left: 0,
    },
    customLinkHeaderTitleBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    customLinkHeaderTitle: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 16,
    },
    customLinksWrapper: {
        marginTop: 8,
        marginBottom: 24,
    },
    urlInput: {
        padding: 16,
        marginBottom: 8,
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)',
        borderRadius: 4,
        position: 'relative',
        '&::before': {
            position: 'absolute',
            content: '""',
            left: 0,
            top: 0,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            height: '100%',
            width: 4,
            backgroundColor: '#1F4C5C'
        }
    },
    customLinkInputsWrapper: {
        paddingTop: 8
    },
    customLinkControlsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    icon: {
        width: '18px !important',
        height: '18px !important',
        '& path': {
            fillOpacity: 1,
            fill: 'rgba(0, 0, 0, 0.6)',
        }
    },
    iconBtn: {
        padding: '6px !important',
        '&:first-of-type': {
            marginRight: '8px !important'
        }
    },
    '.sidebar-menu-arrow': {
        width: 17,
        marginLeft: 'auto',
        color: 'rgba(0, 0, 0, 0.6)',
    }
}));
