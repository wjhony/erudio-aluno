import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listarDisciplinas } from '../actions'
import { 
    Card, CardHeader, CardContent,
    Table, TableHead, TableBody, TableRow, TableCell,
    Paper, Divider, Grid,

} from 'material-ui'
import { CircularProgress } from 'material-ui/Progress'

class ListaDisciplinas extends Component {
    
    componentDidMount() {
        this.props.listarDisciplinas(this.props.match.params.id)
    }

    renderDisciplinas() {
        const disciplinas = this.props.disciplinas
        const first = disciplinas[Object.keys(disciplinas)[0]]
        if (!_.isEmpty(disciplinas)) {
            return (
                <div>
                {_.map(disciplinas, d => (
                    <Card key={d.id} style={{marginBottom: "1em"}}>
                        <CardHeader title={d.disciplina} />
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell><strong>Nota</strong></TableCell>
                                        <TableCell><strong>Faltas</strong></TableCell>
                                    </TableRow>
                                    {d.medias.map(m => (
                                        <TableRow key={m.id}>
                                            <TableCell><strong>{m.nome}</strong></TableCell>
                                            <TableCell>{m.nota || '-'}</TableCell>
                                            <TableCell>{m.faltas}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell><strong>MF</strong></TableCell>
                                        <TableCell>{d.mediaFinal || 'ND'}</TableCell>
                                        <TableCell>{d.frequenciaTotal || 'ND'}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                ))}
                </div>
            )
        } else {
            return (
                <div>
                    <i className="material-icons">grid_off</i>
                    <br />Nenhuma disciplina encontrada.
                </div>
            )
        }
    }

    render() {
        return (
            <Card>
                <CardHeader title="Disciplinas" />
                <CardContent>
                    {this.props.pending 
                        ? <div className="circular-progress"><CircularProgress size={50} /></div> 
                        : this.renderDisciplinas()
                    }
                </CardContent>
            </Card>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return { 
        disciplinas: state.disciplinas,
        pending: state.pending 
    }
}

export default connect(mapStateToProps, { listarDisciplinas })(ListaDisciplinas)