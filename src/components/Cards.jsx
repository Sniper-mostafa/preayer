import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
function Cards({name, time, img}) {
  return (

      <Card sx={{ ":hover": {
        filter: "grayscale(100%)",transition: "0.5s"
      }, width: "400px",boxShadow: 6}}>
        <CardMedia
          component="img"
          alt=""
          height="300"
          image={img}
        />
        <CardContent sx={{textAlign:'center',fontSize: '1.7rem'}}>
          <h2>
            {name}
          </h2>
          <h2 style={{fontSize: '2.5rem'}}>
            {time}
          </h2>
        </CardContent>
      </Card>

  );
}
export default Cards;