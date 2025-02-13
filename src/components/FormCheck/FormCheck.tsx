import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './FormCheck.module.css'

interface FormData {
  name: string;
  age: string;
  email: string;
}

const initialValues: FormData = {
  name: "",
  age: "",
  email: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-zА-Яа-яЁё\s]+$/, "Только буквы")
    .required("Введите имя"),
  age: Yup.string()
    .matches(/^[0-9]+$/, "Только цифры")
    .required("Введите возраст"),
  email: Yup.string()
    .email("Неверный формат email")
    .required("Введите email"),
});

export default function FormComponent() {
  return (
    <main>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => {
          alert(`Имя: ${values.name}\nВозраст: ${values.age}\nEmail: ${values.email}`);
        }}
      >
        {({ errors, touched, setFieldError, setFieldValue }) => (
          <Form>
            <div className={styles.formGroup}>
              <label>Имя:</label>
              <Field
                name="name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("name", e.target.value);
                  setFieldError('name', '');
                }}
                className={errors.name && touched.name ? styles.errorBorder : ""}
              />
              <ErrorMessage name="name" component="p" className={styles.errorText}/>
            </div>
            <div className={styles.formGroup}>
              <label>Возраст:</label>
              <Field
                name="age"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("age", e.target.value);
                  setFieldError('age', '');
                }}
                className={errors.age && touched.age ? styles.errorBorder : ""}
              />
              <ErrorMessage name="age" component="p" className={styles.errorText}/>
            </div>
            <div className={styles.formGroup}>
              <label>Email:</label>
              <Field
                name="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("email", e.target.value);
                  setFieldError('email', '');
                }}
                className={errors.email && touched.email ? styles.errorBorder : ""}
              />
              <ErrorMessage name="email" component="p" className={styles.errorText}/>
            </div>
            <button type="submit" className={styles.buttonCheck}>Проверить данные</button>
          </Form>
        )}
      </Formik>
    </main>
  )
}
