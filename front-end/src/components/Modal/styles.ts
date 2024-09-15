export  default  {
    container: {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 400,
        minHeight: 300,
        bgcolor: '#2a2828',
        border: '2px solid #000',
        boxShadow: 12,
        color: "white",
        p: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        flexDirection: 'column'
    },
    close: {
        color: "#fff",
        left: '92%',
        position: 'absolute' as const,
        top: '0%',
    }
};