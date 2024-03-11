import UserRegisterForm from '../../agency/components/UserRegisterForm';

export default function CreateCustomerPage() {
  

  return (
    <div className='space-y-4 p-4'>
      <h1 className='font-black text-4xl'>Create Customer</h1>
      <div>
        <UserRegisterForm />
      </div>
    </div>
  )
}
