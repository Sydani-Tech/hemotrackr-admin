
import { Link } from 'react-router-dom';

const LoginLink = ({ text = "Already have an account?", linkText = "Sign In" }) => (
    <p className="text-xs text-gray-500 mt-6 md:mt-8">
        {text} <Link to="/auth/login" className="text-primary font-bold hover:underline">{linkText}</Link>
    </p>
);

const SignUpLink = ({ text = "Don't have an account?", linkText = "Sign Up" }) => (
    <p className="text-xs text-gray-500 mt-6 md:mt-8">
        {text} <Link to="/auth/register" className="text-primary font-bold hover:underline">{linkText}</Link>
    </p>
);

export const AvatarHeader = () => (
    <div className="flex mb-6">
        <div className="flex -space-x-3 items-center">
            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="" />
            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="" />
            <div className="relative  h-10 w-10 rounded-full ring-2 ring-white bg-yellow-400 flex items-center justify-center overflow-hidden">
                {/* Pseudo logo */}
                <span className="text-[6px] font-bold text-black scale-75">MASAKA</span>
            </div>
            <div className="ml-2 text-xs h-10 w-10 ring-white rounded-full ring-2 font-medium flex items-center justify-center text-gray-500 bg-white z-10">4m+</div>
        </div>
    </div>
);

export { LoginLink, SignUpLink };
