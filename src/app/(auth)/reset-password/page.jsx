import React, { Suspense } from 'react';
import ResetPasswordForm from './resetPasswordForm';

const ResetPasswordPage = () => {
    return (
        <div className='grid justify-center'>
            <h2>Reset Password</h2>
            <Suspense fallback={<p>Loading..</p>}>
                <ResetPasswordForm></ResetPasswordForm>
            </Suspense>
        </div>
    );
};

export default ResetPasswordPage;
