import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    previewContainer: {
        padding: 16
    },
    headerMessage: {
        color: '#1f4c5c',
    },
    socialWrapper: {
        marginBottom: 24,
        '& svg:nth-child(1)': {
            marginRight: 32,
        }
    },
    reviewsWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        margin: '4px 0',
        '& .MuiRating-root, .Mui-disabled': {
            color: '#295563',
            fontSize: '14px',
            opacity: '1 !important',
            margin: '0 !important',
        },
        '& .MuiRating-root, .MuiRating-icon': {
            margin: '0 2px',
        },
    }
}));
