import { prisma } from "../prisma";
// TODO: try to make this more general purpose
/**
 * Helper function which returns filtered data from prisma.
 *
 * @param query Api Request Query Object.
 */
export default async function queryRoomAPI(
  query: Partial<{
    [key: string]: string | string[];
  }>
) {
  const RESULTS_PER_PAGE = 5;

  // Delete array queries, prisma does not accept them.
  // May implement processing array queries in the future with
  // a different prisma options object.
  let nonArrayQueries = { ...query };
  Object.keys(query).forEach((field) => {
    if (typeof query[field] !== "string") {
      delete nonArrayQueries[field];
    }
  });

  type nonArrayQueryType = Partial<{ [key: string]: string }>;
  // Search by location (needs includes/contains, not exact match)
  const locationQuery = nonArrayQueries.location
    ? {
        address: {
          contains: nonArrayQueries.location,
        },
      }
    : {};

  // Search by name (needs includes/contains, not exact match)
  const nameQuery = nonArrayQueries.name
    ? {
        name: {
          contains: nonArrayQueries.name,
        },
      }
    : {};

  // Construct pagination query
  type prismaPageQueryType = {
    skip?: number;
    take: number;
  };

  const pageQuery = (
    nonArrayQueries.page
      ? {
          skip: (+nonArrayQueries.page - 1) * RESULTS_PER_PAGE,
          take: RESULTS_PER_PAGE,
        }
      : { take: RESULTS_PER_PAGE }
  ) as prismaPageQueryType;

  // Search by other fields (they are going to be exact matches)
  const { location, name, page, ...otherFieldsQuery } = nonArrayQueries;

  const whereQueryOptions = {
    ...locationQuery,
    ...nameQuery,
    ...otherFieldsQuery,
  } as nonArrayQueryType;

  return prisma.room.findMany({
    where: whereQueryOptions,
    ...pageQuery,
  });
}
