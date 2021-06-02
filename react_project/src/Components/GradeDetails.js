import React from 'react';

function GradeDetails(props) {
    return (
        <div>
            <div className="card mt-3 mb-3" id="header_card">
                <div className="card-body">
                    <div className="form-group">
                        <div className="row">
                            <img src="https://dl.iitu.kz/theme/image.php/classic/core/1602665137/u/f1" width="100" height="100" style={{borderRadius: "50%"}}/>
                            <h2 style={{marginLeft: "20px"}}>Nurbol Lakhaibekov</h2>
                        </div>
                        <nav aria-label="breadcrumb" >
                            <ol className="breadcrumb" style={{backgroundColor: "white"}}>
                                <li className="breadcrumb-item"><a href="home.html">В начало</a></li>
                                <li className="breadcrumb-item"><a href="#">Личный кабинет</a></li>
                                <li className="breadcrumb-item active" aria-current="page"><a href="all_grades.html">Оценки</a></li>
                                <li className="breadcrumb-item disabled" aria-current="page">11645</li>
                                <li className="breadcrumb-item active" aria-current="page"><a href="#">Отчет по пользователю</a></li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
      
      
      
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-2" >
                        <div className="card-body p-3">
                            <h5 className="card-title">Навигация</h5>
                        </div>
                        <div className="card-text content">
                            <ul className="list-group">
                                <li className="list-item-group"><a href="home.html">В начало</a></li>
                                <li className="list-item-group"><a href="#">Личный кабинет</a></li>
                                <li className="list-item-group"><a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Мои курсы</a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="course_details.html">11645</a>
                                        <a className="dropdown-item" href="course_details.html">11658</a>
                                        <a className="dropdown-item" href="course_details.html">11659</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-9">
                        <div className="container">
                            <div className="row">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col" width="40%">Элемент оценивания</th>
                                            <th scope="col" width="15%">Рассчитанный вес</th>
                                            <th scope="col" width="5%">Оценка</th>
                                            <th scope="col" width="5%">Диапазон</th>
                                            <th scope="col" width="5%">Проценты</th>
                                            <th scope="col" width="15%">Вклад в итог курса</th>
                                        </tr>
                                    </thead>
                                
                                    <tbody>
                                        <tr>
                                            <th scope="row" colspan="7"><i className="fa fa-folder"></i> 11645 OperatIng Systems (Сапакова С.З.) 2020-2021/1</th>
                                        </tr>
                                        <tr>
                                            <th scope="row" colspan="7"><i className="fa fa-folder"></i> Ведомость</th>
                                        </tr>
                                        <tr>
                                            <th><i className="fa fa-calculator"></i> РК1 (Ведомость)</th>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>0-100</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <th><i className="fa fa-calculator"></i> РК2 (Ведомость)</th>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>0-100</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        
                                        <tr>
                                            <th><i className="fa fa-calculator"></i> РКсрд (Ведомость)</th>
                                            <td>-</td>
                                            <td>F(0,00%)</td>
                                            <td>0-100</td>
                                            <td>0,00%</td>
                                            <td>-</td>
                                        </tr>
                                        
                                        <tr>
                                            <th><i className="fa fa-calculator"></i> Финальный Экзамен (Ведомость)</th>
                                            <td>-</td>
                                            <td>F(0,00%)</td>
                                            <td>0-100</td>
                                            <td>0,00%</td>
                                            <td>-</td>
                                        </tr>
                                        
                                        <tr>
                                            <th><i className="fa fa-calculator"></i> Итог Ведомости Простое среднее взвешенное оценок. Включая незаполненные оценки. (Ведомость)</th>
                                            <td>-</td>
                                            <td>F(0,00%)</td>
                                            <td>0-100</td>
                                            <td>0,00%</td>
                                            <td>-</td>
                                        </tr>
                                        
                                        <tr>
                                            <th><img src="https://dl.iitu.kz/theme/image.php/classic/questionnaire/1602665137/icon"/>  <a href="#">Преподаватель глазами студентов</a></th>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>0-100</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        
                                        <tr>
                                            <th><img src="https://dl.iitu.kz/theme/image.php/classic/attendance/1602665137/icon"/>   <a href="#">Attendance</a></th>
                                            <td>-</td>
                                            <td>A(100,00%)</td>
                                            <td>0-100</td>
                                            <td>100,00%</td>
                                            <td>-</td>
                                        </tr>
                                        
                                        <tr>
                                            <th><img src=" https://dl.iitu.kz/theme/image.php/classic/assign/1602665137/icon"/> <a href="#"> РК1</a></th>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>0-100</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <th><img src=" https://dl.iitu.kz/theme/image.php/classic/assign/1602665137/icon"/>  <a href="#">РК2 </a></th>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>0-100</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        
                                        <tr>
                                            <th><img src="  https://dl.iitu.kz/theme/image.php/classic/quiz/1602665137/icon"/>  <a href="#">Final Test</a></th>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>0-100</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        
                                        <tr>
                                            <th><i className="fa fa-calculator"></i> Итог Дисциплины Простое среднее взвешенное оценок. Включая незаполненные оценки.</th>
                                            <td>-</td>
                                            <td>F(0,00%)</td>
                                            <td>0-100</td>
                                            <td>0,00%</td>
                                            <td>-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default GradeDetails;