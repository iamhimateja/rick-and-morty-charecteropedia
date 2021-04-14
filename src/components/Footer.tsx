import styled from 'styled-components';
const Footer = styled.footer`
  background-color: #404652;
  position: sticky;
  bottom: 0;
  display: flex;
  flex: 0 0 auto;
  place-items: center;
  color: white;
  padding: 1rem;

  .pagination {
    margin-left: auto;

    span {
      margin: 0 5px;
    }

    button {
      margin: 0 10px;
      border: 0;
      background-color: transparent;
      box-shadow: 0 0 0 1px #656565;
      color: #fff;
      border-radius: 5px;
      padding: 10px 15px;
      cursor: pointer;

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        color: #b3b3b3;
      }

      &:not(:disabled):hover {
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
  }
`

export default Footer;