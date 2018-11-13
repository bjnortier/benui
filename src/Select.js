import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ValueComponent from './ValueComponent'
import Decorator from './Decorator'
import Spinner from './Spinner'

const Outer = styled.div`
  display: inline-block;
  cursor: ${({ disabled, inProgress }) => (disabled || inProgress) ? 'not-allowed' : 'pointer'};
  color: ${({ disabled, inProgress }) => (disabled || inProgress) ? '#999' : 'black'};
  user-select: none;
`

const StyledSelect = styled.select`
  border: solid 1px #ccc;
  height: 25px;
  background-color: #fff;
  color: ${({ disabled, error }) => disabled ? '#999' : 'black'};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  :focus {
    outline: none;
    border-color: #5b9dd6;
    box-shadow: 0 0 0px 2px #93cdff;
  }
`

class Select extends ValueComponent {
  handleChange (event) {
    super.handleChange(event, event.target.value)
  }

  render () {
    const { value, disabled, error, inProgress } = this.props
    return <Outer {...{ disabled, error, inProgress }}>
      <Decorator error={error} >
        <StyledSelect
          value={value}
          disabled={disabled || inProgress}
          onChange={this.handleChange.bind(this)}
        >
          {this.props.children}
        </StyledSelect>
      </Decorator>
      {inProgress ? <Spinner padLeft={inProgress || disabled} /> : null}
    </Outer>
  }
}

Select.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  inProgress: PropTypes.bool
}

Select.defaultProps = {
  disabled: false,
  error: false,
  inProgress: false
}

export default Select
