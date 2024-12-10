import BasicExample from '../components/BasicExample/BasicExample';
import QueriesViewer from '../components/ExampleOfUseQueries/QueriesViewer';
import OptimisticUpdates from '../components/OptimisticUpdates/OptimisticUpdates';
import PaginatedTodos from '../components/PaginatedTodos/PaginatedTodos';
import PrefetchingBeforeQuery from '../components/PrefetchingBeforeQuery/PrefetchingBeforeQuery';
import QueryExampleWithUIQ from '../components/QueryExampleWithUIQ/QueryExampleWithUIQ';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <section className="example">
    <h1>{title}</h1>
    {children}
  </section>
);

const Layout: React.FC = () => {
  return (
    <main>
      <Section title="Basic example of Query and Mutation">
        <BasicExample />
      </Section>
      <Section title="Paginated Queries">
        <PaginatedTodos />
      </Section>
      <Section title="Query Example Using useQueries">
        <QueriesViewer />
      </Section>
      <Section title="Infinite Query Example Using useInfiniteQuery hook">
        <QueryExampleWithUIQ />
      </Section>
      <Section title="Example of Optimistic Updates">
        <OptimisticUpdates />
      </Section>
      <Section title="Example of Prefetching">
        <PrefetchingBeforeQuery />
      </Section>
    </main>
  );
};

export default Layout;
