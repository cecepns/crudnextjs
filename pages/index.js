import {useState, useEffect} from 'react'

export default function Home() {

    const [idPost,
        setIdPost] = useState('');
    const [title,
        setTitle] = useState('');
    const [content,
        setContent] = useState('');

    const [post,
        setPost] = useState(null);

    const [prefetch,
        setPrefetch] = useState(false);

    const [loadSubmit,
        setLoadSubmit] = useState(false);

    const [btnUpdate,
        setBtnUpdate] = useState(false)

    useEffect(() => {
        getDataApi();
    }, [prefetch]);

    async function getDataApi() {
        const getData = await fetch('http://localhost:3000/api/posts');
        const resultPost = await getData.json();
        setPost(resultPost)
    }

    const submitValue = async() => {
        if (content.length < 1 || title.length < 1) {
            alert('data tidak boleh kosong')
        } else {
            setLoadSubmit(true)
            const postData = {
                title,
                content
            }

            await fetch('http://localhost:3000/api/posts/create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })

            setTitle('')
            setContent('')
            setPrefetch(!prefetch)
            setLoadSubmit(false)

        }

    }

    const handleDelete = async(id) => {
        const ask = confirm('Yakin ingin menghapus data?')

        if (ask) {
            await fetch('http://localhost:3000/api/posts/delete/' + id, {method: 'DELETE'}).then(response => response.json().then(result => console.log(result)))
            setPrefetch(!prefetch)
        }

    }

    const handleUpdate = e => {
        setBtnUpdate(true)
        setIdPost(e.id);
        setTitle(e.title);
        setContent(e.content);

    }

    const submitUpdate = async() => {
        if (content.length < 1 || title.length < 1 || idPost.length < 1) {
            alert('data tidak boleh kosong')
        } else {
            setLoadSubmit(true)
            const postData = {
                title,
                content
            }

            await fetch('http://localhost:3000/api/posts/update/' + idPost, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify(postData)
                })
                .then(response => response.json())
                .then(result => console.log(result))

            setTitle('')
            setContent('')
            setPrefetch(!prefetch)
            setLoadSubmit(false)
            setBtnUpdate(false)

        }
    }

    let contentPost = null
    if (post === null) {
        contentPost = <div>
            Loading...
        </div>
    } else {
        if (post.data.length < 1) {
            contentPost = <div>
                Tidak ada data
            </div>
        }
        contentPost = <div className="mt-10">
            <table className="border-collapse w-full">
                <thead>
                    <tr>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Id</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Title</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Content</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {post
                        .data
                        .map((i, index) => {
                            // let id = 0
                            return <tr
                                key={i.id}
                                className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Id</span>
                                    {index + 1}
                                </td>
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Title</span>
                                    {i.title}
                                </td>
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Content</span>
                                    {i.content}
                                </td>
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>

                                    <button
                                        onClick={e => handleDelete(i.id)}
                                        className="rounded bg-red-400 py-1 px-3 text-xs font-bold text-white">delete</button>&nbsp;|&nbsp;
                                    <button
                                        onClick={e => handleUpdate(i)}
                                        className="rounded bg-green-400 py-1 px-3 text-xs font-bold text-white">update</button>
                                </td>
                            </tr>
                        })}
                </tbody>

            </table>

        </div>
    }

    return (
        <div className="container mx-auto p-6">
            <form className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Title
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}></input>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Content
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <textarea
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            value={content}
                            onChange={e => setContent(e.target.value)}></textarea>
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        {btnUpdate
                            ? <button
                                    className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="button"
                                    onClick={submitUpdate}>
                                    {loadSubmit
                                        ? "Loading..."
                                        : "update"}
                                </button>
                            : <button
                                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="button"
                                onClick={submitValue}>
                                {loadSubmit
                                    ? "Loading..."
                                    : "create"}
                            </button>}
                    </div>
                </div>
            </form>

            {contentPost}

        </div>
    )
}
