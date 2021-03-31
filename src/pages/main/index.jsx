import React from 'react'

import api from '../../services/api'
import './style.css'

export default class Main extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            docs:[],
            listsInfo:{},
            newListText: ''
        }
        this.handTextChange = this.handTextChange.bind(this)
        this.addList = this.addList.bind(this)
    }

    loadLists = async (page = 1) => {
        const res = await api.get(`/?page=${page}`)
        const {docs, ...listsInfo} = res.data
        this.setState({docs, listsInfo})
    }

    nextPage = () => {
        const {page} = this.state.listsInfo
        const pageN = parseInt(page) + 1
        this.loadLists(pageN)
    }

    prevPage = () => {
        const {page} = this.state.listsInfo
        const pageP = parseInt(page) - 1
        this.loadLists(pageP)
    }

    async removeList(id) {
        await api.delete(`/${id}`)
        this.loadLists()
    }

    async addList(e){
        e.preventDefault()
        const title = this.state.newListText
        await api.post('/', {
            title,
            itens: []
        })
        this.setState({
            newListText: ''
        })
        this.loadLists()
    }

    handTextChange(e) {
        this.setState({newListText: e.target.value})
    }

    componentDidMount() {
        this.loadLists()
    }

    render(){
        const {docs} = this.state
        const {page, pages} = this.state.listsInfo
        return (
            <div className='container'>
                <form className="row g-3 d-flex justify-content-center" onSubmit={this.addList} >
                    <div className="col-auto">
                        <input type="text" className="form-control" value={this.state.newListText} onChange={this.handTextChange} placeholder='Digite o nome da lista' required/>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-outline-dark">Adicionar</button>
                    </div>
                </form>
                {docs.map((value, index) => {
                   return (
                    <div className="card" key={index}>
                        <div className="card-body d-flex justify-content-between align-middle">
                            <h5 className="card-title">{value.title}</h5>
                            <div>
                                <a href={`http://localhost:3000/list/${value._id}`} className="btn btn-outline-dark">Visualizar</a>
                                <button className='btn btn-outline-danger' onClick={() => this.removeList(value._id)}>Excluir</button>
                            </div>
                        </div>
                    </div>
                   )
                })}
                <div className='buttons d-flex justify-content-center'>
                    <button className="btn btn-outline-dark" onClick={this.prevPage} disabled={page == 1}>Anterior</button>
                    <button className="btn btn-outline-dark" onClick={this.nextPage} disabled={page == pages}>Próximo</button>
                </div>
            </div>
        )
    }
}