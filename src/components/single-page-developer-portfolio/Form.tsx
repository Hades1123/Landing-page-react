import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4'; // or 'zod/v4'
import { cn, tw } from '@/libs/cn';

const schema = z.object({
    name: z.string().nonempty('Must not be empty'),
    email: z.email("Invalid email format"),
    message: z.string().min(2),
});

type TForm = z.infer<typeof schema>;

export const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
    } = useForm<TForm>({
        resolver: zodResolver(schema),
        mode: 'onSubmit'
    });

    const baseInputStyle = tw('bg-[#242424] focus:outline-none pl-[1.5rem] pb-[1.06rem] w-[90%]');

    return (
        <form
            onSubmit={handleSubmit((d) => console.log(d))}
            className='flex flex-col gap-4'
        >
            <div className='relative'>
                <input type='text'{...register('name')}
                    className={cn(baseInputStyle)}
                    placeholder='Name'
                />
                <div className={cn('h-[0.0625rem]', isSubmitted ? !errors.name?.message ? 'bg-[#4EE1A0]' : 'bg-[#FF6F5B]' : 'bg-white')} />
                {errors.name?.message && <p className='text-end text-[#FF6F5B] font-[500] text-[0.75rem] pt-[0.33rem]'>{errors.name.message}</p>}
                {errors.name?.message && <div className='absolute right-0 top-0 size-6 text-[#FF6F5B] border-[1px] border-[#FF6F5B] rounded-full flex items-center justify-center'>!</div>}
            </div>
            <div className='relative'>
                <input
                    type="text" {...register('email')}
                    placeholder='Email'
                    className={cn(baseInputStyle, 'relative')}
                />
                <div className={cn('h-[0.0625rem]', isSubmitted ? !errors.email?.message ? 'bg-[#4EE1A0]' : 'bg-[#FF6F5B]' : 'bg-white')} />
                {errors.email?.message && <p className='text-end text-[#FF6F5B] font-[500] text-[0.75rem] pt-[0.33rem]'>{errors.email.message}</p>}
                {errors.email?.message && <div className='absolute right-0 top-0 size-6 text-[#FF6F5B] border-[1px] border-[#FF6F5B] rounded-full flex items-center justify-center'>!</div>}
            </div>
            <div>
                <textarea
                    {...register('message')}
                    placeholder='Message'
                    className={cn(baseInputStyle, 'resize-none min-h-[6.69rem]')}
                />
                <hr />
            </div>
            <button
                type="submit"
                className='text-end font-[700]'
            >
                <span className='inline-block'>SEND MESSAGE
                    <div className='bg-[#4EE1A0] h-[0.125rem] mt-[0.63rem]'></div>
                </span>
            </button>
        </form>
    );
};