import { useForm } from 'react-hook-form';
import { CreateField } from './../common/FormsControls/FormsControls'
import styles from './LoginForm.module.css'

export const LoginForm = ({ login, isValidData }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange' //отображение ошибки сразу при печати
    });

    const onSubmit = (data) => {
        login(data.email, data.password)
    };

    //  console.log(watch("example")); // watch input value by passing the name of it

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>

            {/* register your input into the hook by invoking the "register" function 
             <input className={styles.loginInput}
                placeholder='email'
                {...register("email", {
                    required: "this field is required",
                    pattern: "([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
                })}
            /> */}

            <CreateField Component='input' className={styles.loginInput}
                placeholder='email' register={register} name="email"
                rules={{
                    required: true,
                }}
            />
            {/* {errors.email && errors.email.type === "required" && (
                <span>This is required</span>
            )} */}
            {errors.email?.type === "required" && (
                <span role="alert">email is required</span>
            )}

            <CreateField Component='input' className={styles.loginInput}
                placeholder='password' register={register} name="password"
                rules={{
                    required: true,
                    minLength: 6,
                }}
            />

            {isValidData ? "" : <span style={{ color: "red" }}>invalid password or email</span>}
            {errors.password?.type === "minLength" && (
                <p role="alert">min : 6</p>
            )}

            <button className={styles.loginButton} type="submit">send</button>
        </form>
    );
}