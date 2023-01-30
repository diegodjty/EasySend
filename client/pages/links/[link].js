import Layout from '../../components/Layout';
import axiosClient from '../../config/axios';

export async function getStaticProps({ params }) {
  const { link } = params;
  const result = await axiosClient.get(`/api/links/${link}`);

  return {
    props: {
      link: result.data,
    },
  };
}

export async function getStaticPaths() {
  const links = await axiosClient.get('/api/links');

  return {
    paths: links.data.links.map((link) => ({
      params: { link: link.url },
    })),
    fallback: false,
  };
}

export default ({ link }) => {
  return (
    <Layout>
      <h1 className="text-4xl text-center text-gray-700">
        Download your files
      </h1>
      <div className="flex items-center justify-center mt-10">
        <a
          href={`${process.env.backendURL}/api/files/${link.file}`}
          className="bg-red-500 text-center px-10 py-3 uppercase font-bold text-white cursor-pointer"
          download
        >
          Here
        </a>
      </div>
    </Layout>
  );
};
