from app.database import session


class NewsService:

    @classmethod
    def get_top_news(cls):
        rs = session.execute('select * from news limit 30')

        result = []
        for row in rs:
            result.append(row)

        return result

