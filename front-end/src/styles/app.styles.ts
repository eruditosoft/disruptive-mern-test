export default {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fff223',
    color: '#fff111',
    gap: '1rem',
  },

  content: {
    alignItems: 'center',
    flexDirection: 'column',
    display: 'flex',
    minHeight: 'calc(100vh - 4rem)',
    justifyContent: 'center',
    backgroundColor: '#1a1b1f',
    color: '#fff',
    gap: '1rem',
    padding: '2rem',
    

  },

  child: {
    boxShadow: '-4px 6px 54px 7px rgba(0,0,0,0.71)',
    display: 'grid',
    placeItems: 'center',
    height: '100%',
    width: '100%',
    gridTemplateRows: "10% 85% 5%",
    borderRadius: '5px',
    fontSize: "1rem",
    backgroundColor: 'gray',

  },

};
