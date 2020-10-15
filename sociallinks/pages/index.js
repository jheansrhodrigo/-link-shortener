import React from "react";
import Prismic from "prismic-javascript";

const Index = ({ data }) => {
  console.log("client");
  return (
    <div style={{ background: data.corfundo, color: data.cortexto }}>
      <h1>SocialLinks (Central de links)</h1>
      <ul>
        {data.body.map((item) => {
          return <pre>{JSON.stringify(item)}</pre>;
          if (item.slice_type === "secao") {
            return <h2>{item.primary.nome}</h2>;
          }

          if (item.slice_type === "link") {
            return (
              <li>
                <a href={item.primary.destino.url}>
                  {item.primary.texto_do_botao}
                </a>
              </li>
            );
          }

          return null;
        })}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  console.log("server");
  const client = Prismic.client("https://jeansilva.cdn.prismic.io/api/v2");
  const centralLinks = await client.getSingle("centrallinks");
  console.log(centralLinks);
  return {
    props: {
      data: centralLinks.data,
    },
  };
}

export default Index;
