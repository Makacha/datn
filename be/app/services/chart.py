from app.database import session
from app.helpers import convert_vietnamese_to_english
from app.schemas.chart import Indicator, SearchIndicatorParam


class ChartService:
    @classmethod
    def get_indicator(cls, params: SearchIndicatorParam):
        query = "SELECT * FROM indicator"
        rs = session.execute(query)
        result = []
        keyword = params.keyword.lower()
        latin_keyword = convert_vietnamese_to_english(keyword)
        count = 0
        for row in rs:
            if row['name'].lower().find(keyword) == -1:
                latin_name = convert_vietnamese_to_english(row['name'].lower())
                if latin_name.find(latin_keyword) == -1:
                    continue
            count += 1
            result.append(
                Indicator(
                    id=row['id'],
                    name=row['name'],
                    description=row['description']
                )
            )
        metadata = {
            'total_items': count,
            'current_page': params.page,
            'page_size': params.page_size
        }
        return result, metadata