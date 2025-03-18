import { useForm} from 'react-hook-form';
import styles from './LoginForm.module.css'

export const LoginForm = (props) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'onChange' //отображение ошибки сразу при печати
    });

    const onSubmit = (data) =>{
        props.login(data.email,data.password)
    };
    debugger

    //  console.log(watch("example")); // watch input value by passing the name of it

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>

            {/* register your input into the hook by invoking the "register" function */}
            <input className={styles.loginInput}
                placeholder='email'
                {...register("email", {
                    required: "this field is required",
                    pattern:"([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
                })}
            />

            <input className={styles.loginInput}
                placeholder='password'
                {...register("password", {
                    required: "this field is required",
                })}
            />



            
            <button className={styles.loginButton} type="submit">send</button>
        </form>
    );
}