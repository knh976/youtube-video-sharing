import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Grid, TextField } from '@mui/material';
import { fetchLogin } from '../../reducers/user';
import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import { API_STATUSES } from '../../constants';

export interface LoginFormProps {
  username?: string;
  password?: string;
}
const HeaderLogin = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.user.status);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    defaultValues: {
      username: undefined,
      password: undefined,
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: LoginFormProps) => {
    dispatch(fetchLogin(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item xs={3}>
          <Controller
            name="username"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors['username']}
                size="small"
                fullWidth
                label="username"
                placeholder="username"
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors['password']}
                size="small"
                fullWidth
                label="password"
                placeholder="password"
                type="password"
              />
            )}
          />
        </Grid>
        <Grid item xs="auto" container alignItems="center">
          <Button
            variant="outlined"
            type="submit"
            disabled={status === API_STATUSES.loading}
          >
            Login / Register
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default HeaderLogin;
