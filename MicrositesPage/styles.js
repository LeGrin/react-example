import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    container: {
        '@media (max-width: 1024px)': {
            padding: 16,
            height: 'calc(var(--100vh) - 108px)',
            overflowY: 'auto',
        },
    },
    textLight: {
        color: 'rgba(0, 0, 0, 0.6) !important',
    },
    textDark: {
        color: 'rgba(0, 0, 0, 0.87) !important',
    },
    textDanger: {
        color: '#B00020 !important',
    },
    headerWrapper: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 4,
        padding: 24,
        marginBottom: 16,
        width: '100%',
        '@media (max-width: 700px)': {
            flexDirection: 'column',
        }
    },
    headerTextWrapper: {
        marginLeft: 24,
        width: 'inherit',
        '@media (max-width: 700px)': {
            marginLeft: 0,
            marginTop: 24,
            display: 'flex',
            flexDirection: 'column',
        }
    },
    micrositesCount: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '@media (max-width: 700px)': {
            flexDirection: 'column',
            alignItems: 'center'
        }
    },
    micrositesCountText: {
        color: 'rgba(0, 0, 0, 0.6) !important',
        '@media (max-width: 700px)': {
            textAlign: 'center !important',
            marginTop: '16px !important'
        },
        '& span': {
            color: 'rgba(0, 0, 0, 0.87)',
        }
    },
    subtitle: {
        marginTop: '4px !important',
        marginBottom: '16px !important',
        color: 'rgba(0, 0, 0, 0.6) !important',
        '@media (max-width: 700px)': {
            textAlign: 'center !important',
        }
    },
    cardsWrapper: {
        display: 'grid',
        gridGap: 16,
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    },
}));