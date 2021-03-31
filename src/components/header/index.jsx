import React from 'react'

import './style.css'

export default class Header extends React.Component {
    render() {
        return <header className="p-3 mb-2 bg-dark bg-gradient text-white text-center align-middle"><a href='http://localhost:3000/' >Listas de Compras</a></header>
    }
}