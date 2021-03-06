package eccrm.knowledge.survey.service;

import com.ycrl.core.pager.PageVo;
import eccrm.knowledge.survey.bo.SurveyBo;
import eccrm.knowledge.survey.domain.Survey;
import eccrm.knowledge.survey.vo.SurveyVo;

import java.util.List;

/**
 * @author Michael
 */
public interface SurveyService {

    /**
     * 保存
     */
    String save(Survey survey);

    /**
     * 更新
     */
    void update(Survey survey);

    /**
     * 分页查询
     */
    PageVo pageQuery(SurveyBo bo);

    /**
     * 查询状态为有效的数据，不进行分页，常用于对外提供的查询接口
     */
    List<SurveyVo> queryValid(SurveyBo bo);

    /**
     * 根据ID查询对象的信息
     */
    SurveyVo findById(String id);

    void deleteByIds(String[] ids);

    /**
     * 发布试卷
     *
     * @param id 试卷ID
     * @throws RuntimeException 试卷状态不是“启用状态”
     * @throws RuntimeException 试卷已过期
     * @throws RuntimeException 试卷未设置题目
     */
    void publish(String id);

    /**
     * 查询所有“已发布”，在有效期内，且个人还未参与的试卷列表
     *
     * @return
     */
    List<SurveyVo> queryAllCanRegister();

    /**
     * 注册试卷（即用户申请考试）
     * 注册人：依赖当前登录人的相关信息
     */
    void register(String surveyId, String ip);
}
