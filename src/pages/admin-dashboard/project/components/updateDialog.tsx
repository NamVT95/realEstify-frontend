import React from 'react'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import UpdateProjectForm from '../form/update-project'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { closeUpdateForm } from '@/store/project/updateProjectSlice'
export default function UpdateDialog() {
    const dispatch = useAppDispatch()
    const { isUpdateFormOpen, project } = useAppSelector((state) => state.updateProject);
    console.log(project)

    return (
        <Dialog open={isUpdateFormOpen} onOpenChange={() => {
            dispatch(closeUpdateForm())
        }} >
            <DialogContent>
                <div className='space-y-4 p-6'>
                    <section className='text-xl font-bold flex justify-between items-center'>
                        <h1>Open For sale Project #{project?.ProjectId}</h1>
                    </section>
                    <div>
                        <UpdateProjectForm />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
