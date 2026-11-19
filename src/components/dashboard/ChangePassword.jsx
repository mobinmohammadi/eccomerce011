import React from 'react';

const ChangePassword = () => {
    return (
        <div className='rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5 lg:p-6'>
            <h2 className='pb-4 text-lg font-semibold text-slate-700 sm:pb-5 sm:text-xl'>Change Password</h2>

            <form className='max-w-md space-y-4'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="old_password" className='text-sm text-slate-600'>Old Password</label>
                    <input
                        className='w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-1 focus:ring-green-500'
                        type="password"
                        name="old_password"
                        id="old_password"
                        placeholder='Old Password'
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="new_password" className='text-sm text-slate-600'>New Password</label>
                    <input
                        className='w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-1 focus:ring-green-500'
                        type="password"
                        name="new_password"
                        id="new_password"
                        placeholder='New Password'
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="confirm_password" className='text-sm text-slate-600'>Confirm Password</label>
                    <input
                        className='w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-1 focus:ring-green-500'
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        placeholder='Confirm Password'
                    />
                </div>

                <div className='pt-1'>
                    <button className='w-full rounded-md bg-[#059473] px-8 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-[#047a5f] hover:shadow-green-500/30 sm:w-auto'>
                        Update Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;