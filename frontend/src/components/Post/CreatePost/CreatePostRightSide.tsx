import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';

type CreateForm = {
  description: string;
}

type Props = {
  createPostOnClick: (description: string) => void
}

const validationSchema = yup.object<CreateForm>({
  description: yup
    .string()
    .required('Description is required')
    .min(2, 'Description should be of minimum 2 characters length')
    .max(255, 'Description should be of maximum 255 characters length'),
});

const CreatePostRightSide = ({createPostOnClick}: Props) => {
  const formik = useFormik({
    initialValues: {
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: CreateForm, {resetForm}) => {
      createPostOnClick(values.description)
      resetForm();
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{width: '100%'}}>
      <TextField
        fullWidth
        multiline
        rows={3}
        maxRows={10}
        id="description"
        name="description"
        label="What are you thinking?"
        margin="normal"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <Button 
        color="primary" 
        variant="contained" 
        fullWidth 
        type="submit" 
        size="small">
        Create 
      </Button>
    </form>
  )
}

export default CreatePostRightSide;