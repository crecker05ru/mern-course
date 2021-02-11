import {AuthContext} from "../context/AuthContext";
import {Component, useCallback, useContext, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useEffect} from "react";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";



class LinkList extends Component {
    render() {
        return null;
    }
}

export const LinksPage = () =>{
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback( async () =>{
        try{
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        }catch (e){}
    },[token, request])

    useEffect( () =>{
        fetchLinks()
    },[fetchLinks])

    if (loading) {
        return <Loader />
    }
    return (
        <>
            {!loading && <LinksList links={links} />}
        </>
    )
}