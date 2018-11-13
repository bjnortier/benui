import React, { Component } from 'react'
import { faClipboard, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import {
  HSpace,
  Input,
  TextButton,
  IconButton,
  Switch,
  Checkbox,
  Select,
  Verified
} from '../../src'

import StyledTable from './StyledTable'

const handleClick = (event) => {
  console.log(event)
}

const renderProps = (props) =>
  Object.keys(props).map(key =>
    `${key}={${props[key]}}`
  ).join(' ')

const StyledDiv = styled.div`
  td {
    background-color: #f5f5f5;
  }
  td:nth-child(1) {
    background-color: inherit;
  }
`

const renderValue = value => {
  switch (typeof value) {
    case 'string':
    case 'number':
      return `${value} [${typeof value}]`
    case 'boolean':
      return `${value ? 'true' : 'false'} [${typeof value}]`
    default:
      return value
  }
}

class Row extends Component {
  constructor (props) {
    super(props)
    this.state = {
      onChangeValue: undefined
    }
  }

  handleChange (event, value) {
    this.setState({ onChangeValue: value })
  }

  render () {
    const { Component, componentProps, componentChildren } = this.props
    const { onChangeValue } = this.state
    const element = React.createElement(Component, {
      ...componentProps,
      onChange: this.handleChange.bind(this),
      value: onChangeValue !== undefined ? onChangeValue : componentProps.value
    }, componentChildren)
    return <tr>
      <td>{`<${Component.name} ${renderProps(componentProps)} />`}:</td>
      <td>{element}</td>
      <td>{renderValue(onChangeValue)}</td>
    </tr>
  }
}

export default (props) => <StyledDiv>
  <StyledTable><tbody>
    <tr><th>JSX</th><th>Component</th><th>onChange(event, value)</th></tr>
    <Row
      Component={Input}
      componentProps={{ width: 120 }}
      value=''
    />
    <Row
      Component={Input}
      componentProps={{ placeholder: 'username' }}
      value=''
    />
    <Row
      Component={Checkbox}
      componentProps={{ label: 'Option A' }}
    />
    <Row
      Component={Checkbox}
      componentProps={{ label: <FontAwesomeIcon icon={faFilter} />, value: true }}
    />
    <Row
      Component={Switch}
      componentProps={{}}
    />
    <Row
      Component={Switch}
      componentProps={{ value: true }}
    />
    <Row
      Component={Select}
      componentProps={{ value: 'London' }}
      componentChildren={[
        <option key={0}>Cape Town</option>,
        <option key={1}>Toronto</option>,
        <option key={2}>London</option>
      ]}
    />
    <tr>
      <td>{`<TextButton label='Click me' />`}:</td>
      <td colSpan='3' ><TextButton label='Click me' onClick={handleClick} /></td>
    </tr>
    <tr>
      <td>{`<IconButton  />`}:</td>
      <td colSpan='3' ><IconButton icon={faTrashAlt} onClick={handleClick} /></td>
    </tr>
    <tr>
      <td>{`<IconButton transparent icon={faTrashAlt} />`}:</td>
      <td colSpan='3' ><IconButton transparent icon={faTrashAlt} onClick={handleClick} /></td>
    </tr>
    <tr>
      <td>{`<Verified pass /> <Verified />`}</td>
      <td colSpan='3' ><Verified pass /><HSpace /><Verified /></td>
    </tr>
    <tr>
      <td>Row of components</td>
      <td colSpan='3'>
        <TextButton label='Row' onClick={handleClick} />
        <HSpace />
        <Switch onChange={() => {}} />
        <HSpace />
        <Checkbox label='Option B' onChange={() => {}} />
        <HSpace />
        <Input value='' onChange={() => {}} />
        <HSpace />
        <Select onChange={() => {}} value='A'><option>A</option></Select>
        <HSpace />
        <Verified />
        <HSpace />
        <IconButton icon={faClipboard} onClick={handleClick} />
        <HSpace />
        <IconButton icon={faTrashAlt} onClick={handleClick} />
      </td>
    </tr>
  </tbody></StyledTable>
</StyledDiv>
