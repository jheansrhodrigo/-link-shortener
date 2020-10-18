import React from "react";
import Prismic from "prismic-javascript";
import Head from "next/head";

const Index = ({ data }) => {
  return (
    <div style={{ background: data.corfundo, color: data.cortexto }}>
      <Head>
        <title>{data.pagetitle}</title>
      </Head>
      <div className="w-1/2 mx-auto text-center">
        <h1 className="font-bold text-4xl p-8">{data.title}</h1>
        <img
          src={data.logo.url}
          alt="logo"
          className="mx-auto rounded-full shadow-2xl w-1/6"
        />
        {data.body.map((item) => {
          if (item.slice_type === "secao") {
            return (
              <h2 className="font-bold text-2xl pt-4">{item.primary.nome}</h2>
            );
          }

          if (item.slice_type === "link") {
            return (
              <div>
                <a
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 m-2 inline-block rounded inline-flex items-center"
                  href={item.primary.destino.url}
                >
                  {item.primary.texto_do_botao}
                </a>
              </div>
            );
          }

          if (item.slice_type === "imagem") {
            return (
              <img
                src={item.primary.imagem.url}
                alt="imagem"
                className="mx-auto w-1/2"
              />
            );
          }

          return null;
        })}
      </div>
      <div className="text-center py-6">
        Projeto central de links para encurtar links de mídias sociais
        <br />
        Código disponivel no
        <a className="font-bold" href="https://github.com/jheansrhodrigo">
          GitHub
        </a>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const client = Prismic.client("https://jeansilva.cdn.prismic.io/api/v2");
  const centralLinks = await client.getSingle("centrallinks");

  return {
    props: {
      data: centralLinks.data,
    },
  };
}

export default Index;
