import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import { useState } from 'react'

const BookCreate = () =>{
    const router = useRouter()
    const [bookTitle,setBookTitle] = useState('')
    const [errors,setErrors] = useState([])
    const [submitting,setSubmitting] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault()
        setSubmitting(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`,{
            method: 'POST',
            headers:{
                accept: 'application/json',
                'content-type': 'application/json',

            },
            body: JSON.stringify({
                title:bookTitle
            })
        })

        if(res.ok){
            setErrors([])
            setBookTitle('')
            return router.push('/libros')

        }
        const data = await res.json()
        setErrors(data.errors)
        setSubmitting(false)
        
    }

    return (
        <div>
            <h1>BookCreate</h1>
            {/* <p>{JSON.stringify(errors)}</p> */}
            <form onSubmit={handleSubmit}>
                <input 
                onChange={(e)=>setBookTitle(e.target.value)}
                value={bookTitle}
                disabled={submitting}
                typr="text" data-cy="input-book-title">
                </input>
                <button 
                disabled={submitting}
                data-cy="btn-submit-book"
                >
                    {submitting ? 'Enviando...' : 'Enviar'}
                </button>
                
                {errors.title && (
                    <span style={{color:'red',display:'block',marginTop:10 }}>{errors.title}</span>)
                }
            </form>
            <br></br>
            <Link href="/libros">Book List</Link>
        </div>
    )
}

export default BookCreate