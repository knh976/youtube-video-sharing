import React from "react";
import { createConsumer } from "@rails/actioncable";
import { useSnackbar } from "notistack";
import { waitFor } from "@testing-library/react";
import { renderWithApp } from "../../../helpers/testWithContext";
import Notification from "../index";

jest.mock('@rails/actioncable', () => ({
  createConsumer: jest.fn(),
}));

jest.mock('notistack', () => ({
  useSnackbar: jest.fn(),
}));

describe('Notification', () => {
  let mockSubscription: any;
  let mockConsumer: any;
  let enqueueSnackbarMock: jest.Mock;

  beforeEach(() => {
    mockSubscription = {
      unsubscribe: jest.fn(),
      send: jest.fn(),
    };

    mockConsumer = {
      subscriptions: {
        create: jest.fn((channel, callbacks) => {
          // Simulate the received callback
          setTimeout(() => {
            callbacks.received({
              username: 'abc',
              video_title: 'Video Title',
            });
          }, 100);
          return mockSubscription;
        }),
      },
    };

    (createConsumer as jest.Mock).mockReturnValue(mockConsumer);

    enqueueSnackbarMock = jest.fn();
    (useSnackbar as jest.Mock).mockReturnValue({ enqueueSnackbar: enqueueSnackbarMock });
  });

  it('should not call enqueueSnackbar when the user is NOT logged in', async () => {
    const initState = {
      user: {
        token: '',
        username: '',
      },
      listMovies: {
        status: 'idle',
        movies: [],
      },
    };

    renderWithApp(<Notification />, { initState });

    await waitFor(() => {
      expect(enqueueSnackbarMock).not.toHaveBeenCalled();
    });
  });

  it('should not call enqueueSnackbar when the video owner is the user currently logged in', async () => {
    const initState = {
      user: {
        token: 'token',
        username: 'abc',
      },
      listMovies: {
        status: 'idle',
        movies: [],
      },
    };

    renderWithApp(<Notification />, { initState });

    await waitFor(() => {
      expect(enqueueSnackbarMock).not.toHaveBeenCalled();
    });
  });

  it('should call enqueueSnackbar when video owner is NOT the user currently logged in', async () => {
    const initState = {
      user: {
        token: 'token',
        username: 'xyz',
      },
      listMovies: {
        status: 'idle',
        movies: [],
      },
    };

    renderWithApp(<Notification />, { initState });

    await waitFor(() => {
      expect(enqueueSnackbarMock).toHaveBeenCalledWith(
        'abc shared Video Title',
        {
          variant: 'success',
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        }
      );
    });
  });
});
