import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DeleteIcon } from 'assets/images/icons';
import { Typography } from '@components/Typography';

export const useStyles = makeStyles(() => ({
    card: {
        padding: 16,
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 4,
        maxWidth: 360,
        '@media (max-width: 700px)': {
            maxWidth: 'none',
        }
    },
    cardSubtitle: {
        margin: '4px 0 16px !important',
        display: 'inline-block !important',
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.12)'
    },
    cardFooter: {
        paddingTop: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '@media (max-width: 700px)': {
            flexDirection: 'column',
            alignItems: 'flex-start',
            '& div:nth-child(1)': {
                marginBottom: 16
            }
        }
    },
    cardConversion: {
        display: 'flex',
        flexDirection: 'column',
        '& span:nth-child(1)': {
            marginBottom: 4
        }
    },
    cardControls: {
        '@media (max-width: 700px)': {
            width: '100%'
        }
    },
    iconBtn: {
        border: '1px solid rgba(0, 0, 0, 0.12) !important',
        borderRadius: '4px !important',
        height: '32px !important',
        width: '32px !important',
        padding: '2px !important',
        '@media (max-width: 700px)': {
            width: 'calc(25% - 6px) !important',
        },
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
    iconBtnSingle: {
        '&:nth-child(1)': {
            marginRight: 0
        },
    }
}));

const MicrositeCard = ({
    translation,
    microsite,
    companies,
    isSubmitting,
    onClickDelete,
    onClickEdit,
    onClickView,
    isUser
}) => {
    const classes = useStyles();

    const companyName = companies?.find(company => company.companyId === microsite.companyId)?.companyName

    return (
        <div className={classes.card}>
            <Typography variant="subtitle2">{microsite.name}</Typography>
            <Typography variant="caption" className={cls(classes.textLight, classes.cardSubtitle)}>
                {companyName}
            </Typography>
            <div className={classes.divider} />
            <div className={classes.cardFooter}>
                <div className={classes.cardConversion}>
                    <Typography variant="caption" className={classes.textLight}>
                        {translation.visits}
                        <span className={classes.textDark}>{microsite.visitorsCount || '0'}</span>
                    </Typography>
                </div>
                <div className={classes.cardControls}>
                    {!isUser ? (
                        <>
                            <IconButton className={classes.iconBtn} disabled={isSubmitting} onClick={onClickEdit}>
                                <EditIcon />
                            </IconButton>
                            <IconButton className={classes.iconBtn} disabled={isSubmitting} onClick={onClickDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <IconButton className={cls(classes.iconBtn, classes.iconBtnSingle)} onClick={onClickView}>
                                <VisibilityIcon />
                            </IconButton>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MicrositeCard;
