import UserRegisterForm from "./UserRegisterForm";

export default function CreateAgencyPage() {
  return (
    <div className='space-y-4 p-4'>
      <h1 className='font-black text-4xl'>Create Agency</h1>
      <div>
        <UserRegisterForm />
      </div>
    </div>
  )
}
