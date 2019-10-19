import React, { Component } from 'react'

export class DataTugas extends Component {
    render() {
        return (
            <div>
                <table className="table table-striped table-responsive-md btn-table " style={{marginTop:91}}>
                    <thead>
                    <th>NO</th>
                    <th>Tugas</th>
                    <th>Deadline</th>
                    <th>Deadline Revisi</th>
                    <th>Action</th>
                    <th>Status</th>
                    </thead>
                </table>
            </div>
        )
    }
}

export default DataTugas
