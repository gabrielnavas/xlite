import { Theme } from "@emotion/react";
import { Box, Button, TextField } from "@mui/material";

import { Data, UpdateForm } from "./ModalUpdate";

import { useFormik } from "formik";
import * as yup from 'yup';
import { formatDistanceToNow } from "date-fns";

const validationSchema = yup.object<UpdateForm>({
  description: yup
    .string()
    .required('Description is required')
    .min(2, 'Description should be of minimum 2 characters length')
    .max(255, 'Description should be of maximum 255 characters length'),
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30rem',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: '0.5rem',
  p: 4,
} as Theme;


type Props = {
  data: Data;
  onFinishUpdate: (data: UpdateForm) => void;
}

const BoxInside = ({ data, onFinishUpdate }: Props) => {
  const formik = useFormik({
    initialValues: {
      description: data.post.text,
    },
    validationSchema: validationSchema,
    onSubmit: (values: UpdateForm) => onFinishUpdate(values),
  });

  const date: string = formatDistanceToNow(data.post.createdAt, { addSuffix: true });

  return (
    <Box sx={style}>
      <div>Created at {date}</div>
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
  )
}


export default BoxInside;