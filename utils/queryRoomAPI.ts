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
  // Delete array queries, prisma does not accept them.
  let nonArrayQueries = { ...query };
  Object.keys(query).forEach((field) => {
    if (typeof field !== "string") {
      delete nonArrayQueries[`${field}`];
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
  let nameQuery = nonArrayQueries.name
    ? {
        name: {
          contains: nonArrayQueries.name,
        },
      }
    : {};

  // Search by other fields
  const { location, name, ...fieldQuery } = nonArrayQueries;

  const whereQueryOptions = {
    ...locationQuery,
    ...nameQuery,
    ...fieldQuery,
  } as nonArrayQueryType;

  return prisma.room.findMany({
    where: whereQueryOptions,
  });
}
