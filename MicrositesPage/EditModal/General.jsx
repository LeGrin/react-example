import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import { Input } from '@components/fields/Input';
import { Select } from '@components/fields/Select';
import { Switch } from '@components/fields/Switch';
import Tooltip from '@components/Tooltip';
import { useThrottle } from '@hooks/useThrottle';
import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import { IntegrationName } from '@constants/integrations.constants';
import { CopyIcon } from 'assets/images/icons';
import { useStyles } from './styles';

export const CssStartAdornment = styled(InputAdornment)({
    margin: 0,
    '& .MuiTypography-root': {
        fontSize: '14px'
    }
});

const General = ({
    t,
    isView,
    account,
    setPreview,
    location,
    setLocation,
    companyOptions
}) => {
    const classes = useStyles();
    const { control, setValue, getValues } = useFormContext();
    const { onCopy } = useCopyToClipboard();
    const [onCopyClick] = useThrottle(value => onCopy(value), 1000);

    const googleConnected = useMemo(() => {
        return (account?.companies?.find(c => c.companyId === location)
        ?.profiles.find(p => p.type === IntegrationName.Google && p.profileUniqueId) !== undefined);
    }, [location, account.companies]);

    return (
        <>
            <div className={classes.oneColForm}>
                <Controller
                    control={control}
                    name="name"
                    render={({ field, fieldState: { error }, ref }) =>
                        <Input
                            ref={ref}
                            inputProps={{ ...field, onChange: e => field.onChange(e.target.value) }}
                            label={t.codeName}
                            fullWidth
                            error={!!error}
                            helperText={error ? error.message : null}
                            required
                            disabled={isView}
                        />
                    }
                />
                <Controller
                    control={control}
                    name="companyId"
                    render={({ field, ref }) => (
                        <Select
                            {...field}
                            onChange={e => {
                                field.onChange(e.target.value);
                                setLocation(e.target.value);
                                setPreview(prev => ({ ...prev, companyId: e.target.value }));
                            }}
                            ref={ref}
                            label={t.location}
                            fullWidth
                            options={companyOptions}
                            disabled={isView}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="slug"
                    className={classes.urlInput}
                    render={({ field, fieldState: { error }, ref }) =>
                        <Input
                            ref={ref}
                            inputProps={{ ...field, onChange: e => field.onChange(e.target.value) }}
                            label={t.url}
                            startAdornment={(
                                <CssStartAdornment position="start">
                                    {`${process.env.REACT_APP_SURVEY_DOMAIN}/`}
                                </CssStartAdornment>
                            )}
                            onAddonClick={() => onCopyClick(`${process.env.REACT_APP_SURVEY_DOMAIN}/${getValues('slug')}`)}
                            addonComponent={<CopyIcon style={{ fill: 'rgba(0, 0, 0, 0.6)'}} />}
                            fullWidth
                            error={!!error}
                            helperText={error ? error.message : null}
                            required
                            disabled={isView}
                        />
                    }
                />
            </div>
            {!googleConnected ? (
                <Tooltip placement="top" title={t.updateGoogleTooltip}>
                    <span>
                        <Switch
                            className={classes.switchInput}
                            checked={getValues('updateGoogleWebsite')}
                            label={t.updateGoogle}
                            disabled
                        />
                    </span>
                </Tooltip>
            ) : (
                <Controller
                    control={control}
                    name="updateGoogleWebsite"
                    render={({ field, ref }) =>
                        <Switch
                            {...field}
                            ref={ref}
                            className={classes.switchInput}
                            checked={getValues('updateGoogleWebsite')}
                            handleChange={event => {
                                setValue('updateGoogleWebsite', event.target.checked);
                                setPreview(prev => ({ ...prev, updateGoogleWebsite: event.target.checked }))
                            }}
                            label={t.updateGoogle}
                        />
                    }
                />
            )}
        </>
    );
};

export default General;
