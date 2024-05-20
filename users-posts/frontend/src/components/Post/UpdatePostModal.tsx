import { Theme } from "@emotion/react";
import { Box, Button, Modal, TextField } from "@mui/material";

import { useFormik } from "formik";
import * as yup from 'yup';

type Props = {
  open: boolean
  onClose: () => void,
  data: {
    user: {
      avatarUrl: string
      name: string;
      username: string;
    },
    post: {
      text: string;
      createdAt: Date;
    }
  }
  onFinishUpdate: (data: FormikForm) => void
};

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30rem',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
} as Theme;

type FormikForm = {
  description: string;
}

const validationSchema = yup.object<FormikForm>({
  description: yup
    .string()
    .required('Description is required')
    .min(2, 'Description should be of minimum 2 characters length')
    .max(255, 'Description should be of maximum 255 characters length'),
});


const UpdatePostModal = ({ open, onClose, data, onFinishUpdate }: Props) => {
  const formik = useFormik({
    initialValues: {
      description: data.post.text,
    },
    validationSchema: validationSchema,
    onSubmit: (values: FormikForm) => onFinishUpdate(values),
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            multiline
            id="description"
            name="description"
            label="Description"
            margin="normal"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <Button color="primary" variant="contained" fullWidth type="submit" size="small">
            Update
          </Button>
        </form>
      </Box>
    </Modal>
  )
}
export default UpdatePostModal;