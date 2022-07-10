import { showNotification } from "@mantine/notifications";
import { MantineTheme } from "@mantine/styles";

export const onSuccessUpdate = () => {
  showNotification({
    title: "Success!",
    message: "Your links have been successfully updated!",
    styles: successTheme,
  });
};

export const onErrorUpdate = () => {
  showNotification({
    title: "Error!",
    message:
      "There was an error when trying to update your links. Please try again later!",
    styles: (theme) => ({
      root: {
        backgroundColor: theme.colors.red[6],
        borderColor: theme.colors.red[6],
        "&::before": { backgroundColor: theme.white },
      },
      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        "&:hover": { backgroundColor: theme.colors.blue[7] },
      },
    }),
  });
};

export const onRejectUpload = () => {
  showNotification({
    title: "Error!",
    message:
      "File uploaded is either too large (1 MB) or has an invalid file type",
    styles: (theme) => ({
      root: {
        backgroundColor: theme.colors.red[6],
        borderColor: theme.colors.red[6],
        "&::before": { backgroundColor: theme.white },
      },
      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        "&:hover": { backgroundColor: theme.colors.blue[7] },
      },
    }),
  });
};

export const invalidUpdate = () => {
  showNotification({
    title: "Error!",
    message: "One of more links you updated is invalid. Please check again.",
    styles: errorTheme,
  });
};

const errorTheme = (theme: MantineTheme) => ({
  root: {
    backgroundColor: theme.colors.red[6],
    borderColor: theme.colors.red[6],
    "&::before": { backgroundColor: theme.white },
  },
  title: { color: theme.white },
  description: { color: theme.white },
  closeButton: {
    color: theme.white,
    "&:hover": { backgroundColor: theme.colors.blue[7] },
  },
});

const successTheme = (theme: MantineTheme) => ({
  root: {
    backgroundColor: theme.colors.green[6],
    borderColor: theme.colors.green[6],
    "&::before": { backgroundColor: theme.white },
  },
  title: { color: theme.white },
  description: { color: theme.white },
  closeButton: {
    color: theme.white,
    "&:hover": { backgroundColor: theme.colors.blue[7] },
  },
});
