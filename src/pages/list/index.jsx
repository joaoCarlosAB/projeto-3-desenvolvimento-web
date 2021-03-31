import React from 'react'

import api from '../../services/api'

import './style.css'

export default class List extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            title: '',
            itens: [],
            newItenText: '',
            newQtd: 1
        }

        this.addIten = this.addIten.bind(this)
        this.handTextChange = this.handTextChange.bind(this)
        this.handQtdChange = this.handQtdChange.bind(this)
    }

    

    async componentDidMount() {
        const {id} = this.props.match.params

        const res = await api.get(`/${id}`)
        const {title, itens} = res.data
        this.setState({title, itens})
    }

    async update() {
        const {id} = this.props.match.params
        const {title, itens} = this.state

        const res = await api.put(`/${id}`, {
            title,
            itens
        })

        this.componentDidMount()
    }

    async addIten(e) {
        await this.setState({
            itens: [
                ...this.state.itens,
                {
                    name: this.state.newItenText,
                    qtd: this.state.newQtd
                }
            ]
        })

        this.setState({
            newItenText: '',
            newQtd: 1
        })

        this.update()
        e.preventDefault()
    }

    async removeIten(id) {
        const {itens} = this.state

        const newItens = itens.filter(value => value._id != id)

        await this.setState({
            itens: newItens
        })

        this.update()
    }

    async checkIten(id) {
        const {itens} = this.state

        const alterItens = itens.map(value => value._id == id ? {...value, qtd: 0}: value)

        await this.setState({
            itens: alterItens
        })

        this.update()
    }

    handTextChange(e) {
        this.setState({newItenText: e.target.value})
    }

    handQtdChange(e) {
        this.setState({newQtd: e.target.value})
    }

    render() {
        const {title, itens} = this.state
        return (
            <div className="container card">
                <div className="card-header text-center">
                    {title}
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div className="row align-items-start">
                            <div className="col text-center">
                            Iten
                            </div>
                            <div className="col text-center">
                            Quantidade
                            </div>
                            <div className="col text-center">
                            Opções
                            </div>
                        </div>
                    </li>
                    {itens.filter(value => value.qtd > 0).map((value, index) => {
                        return (<li className="list-group-item" key={index} >
                            <div className="row align-items-start">
                                <div className="col text-center">
                                {value.name}
                                </div>
                                <div className="col text-center">
                                {value.qtd}
                                </div>
                                <div className="col d-flex justify-content-center buttons-2">
                                    <button className="btn btn-outline-danger" onClick = {() => this.removeIten(value._id)}>Excluir</button>
                                    <button className="btn btn-outline-primary" onClick = {() => this.checkIten(value._id)}>Check</button>
                                </div>
                            </div>
                        </li>)
                    })}
                </ul>
                <form className="row g-3 d-flex justify-content-center" onSubmit={this.addIten} >
                    <div className="col-auto">
                        <input type="text" className="form-control" value={this.state.newItenText} onChange={this.handTextChange} placeholder='Iten' required/>
                    </div>
                    <div className="col-auto">
                        <input type="number" className="form-control" value={this.state.newQtd} onChange={this.handQtdChange}  />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-outline-dark">Adicionar</button>
                    </div>
                </form>
                <div className="card-header text-center">
                    Check
                </div>
                {itens.filter(value => value.qtd == 0).map(value => {
                    return (<li className="list-group-item card-header" key={value._id} >
                        <div className="row align-items-start">
                            <div className="col text-center">
                            <del>{value.name}</del>
                            </div>
                            <div className="col text-center">
                            No carinho
                            </div>
                        </div>
                    </li>)
                })}
            </div>
        )
    }
}