import { Link, Navigate, useLocation, useNavigate } from 'react-router'; // Corrected import
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { saveUserInDb } from '../../api/utils';
import Button from '../../components/Shared/Button/Button'; // <-- Import the new Button

const Login = () => {
  const { signIn, signInWithGoogle, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

  if (user) return <Navigate to={from} replace={true} />;
  if (loading && !user) return <LoadingSpinner />;

  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      // The saveUserInDb is optional on login, as user should already exist
      // await saveUserInDb(result.user); 
      navigate(from, { replace: true });
      toast.success('Login Successful');
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      await saveUserInDb(result.user);
      navigate(from, { replace: true });
      toast.success('Login Successful');
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>Sign in to access your account</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          {/* Email and Password Inputs remain the same */}
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>Email address</label>
              <input type='email' name='email' id='email' required placeholder='Enter Your Email Here' className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900' />
            </div>
            <div>
              <label htmlFor='password' className='text-sm mb-2'>Password</label>
              <input type='password' name='password' id='password' required placeholder='*******' className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900' />
            </div>
          </div>

          {/* Replaced with Button component */}
          <Button
            type="submit"
            disabled={loading}
            label={loading ? <TbFidgetSpinner className='animate-spin m-auto' size={24} /> : 'Continue'}
          />
        </form>

        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 bg-gray-300'></div>
          <p className='px-3 text-sm text-gray-500'>Login with social accounts</p>
          <div className='flex-1 h-px sm:w-16 bg-gray-300'></div>
        </div>

        {/* Replaced with Button component */}
        <div className='mt-4'>
            <Button
                onClick={handleGoogleSignIn}
                label='Continue with Google'
                icon={FcGoogle}
                outline
            />
        </div>

        <p className='mt-8 px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link to='/signup' className='hover:underline hover:text-lime-500 text-gray-600'>
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;