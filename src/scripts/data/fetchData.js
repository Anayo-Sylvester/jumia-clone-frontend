const fetchData = async (dataRef,setLoading,url) => {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        dataRef.current = data;
        console.log(dataRef.current)
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setLoading(false);
    }
};

export default fetchData