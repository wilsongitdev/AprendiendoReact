const Header = ({ title }: { title: string }): JSX.Element => {
  return <h1>{(title !== '') || 'Default title'}</h1>
}

export default Header
