import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, Link } from '@inertiajs/react';

export default function Dashboard(props) {
    const { post } = usePage().props;
    const { data, setData, put, errors } = useForm({
        title: post.title || "",
        body: post.body || "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("posts.update", post.id));
    }
    return (
        <AuthenticatedLayout auth={props.auth} user={props.auth.user} errors={props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Post</h2>}>
            <Head title="Posts" />
            <div className="py-12">
                <div className="min-h-screen flex flex-col sm:justify-start items-center pt-6 sm:pt-0 bg-gray-100">
                    <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                        <div className="flex items-center justify-between mb-6">
                            <Link className="flex items-center px-6 py-2 text-white bg-gray-500 rounded-md focus:outline-none" href={route("posts.index")}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                </svg>
                                <span className="ml-2">Back</span>
                            </Link>
                        </div>
                        <form name="createForm" onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <div className="mb-4">
                                    <label className="">Title</label>
                                    <input type="text" className="w-full px-4 py-2" label="Title" name="title" value={data.title} onChange={(e) => setData("title", e.target.value)} />
                                    <span className="text-red-600">
                                        {errors.title}
                                    </span>
                                </div>
                                <div className="mb-0">
                                    <label className="">Body</label>
                                    <textarea type="text" className="w-full rounded" label="body" name="body" errors={errors.body} value={data.body} onChange={(e) => setData("body", e.target.value)} />
                                    <span className="text-red-600">
                                        {errors.body}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button type="submit" className="flex items-center px-6 py-2 font-bold text-white bg-green-500 rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                    <span className="ml-2">Update</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}    
